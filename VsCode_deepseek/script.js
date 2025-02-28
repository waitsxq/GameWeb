// Three.js 粒子效果
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('particle-canvas') });
renderer.setSize(window.innerWidth, window.innerHeight);

const particlesGeometry = new THREE.BufferGeometry();
const particlesCnt = 5000;

const posArray = new Float32Array(particlesCnt * 3);

for (let i = 0; i < particlesCnt * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5; // 缩小粒子范围
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: '#00FFF0' // 霓虹青
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    particlesMesh.rotation.x += 0.001;
    particlesMesh.rotation.y += 0.001;
    renderer.render(scene, camera);
}

animate();

// GSAP 动画
gsap.from('.holographic-text', { opacity: 0, duration: 2, y: -50, ease: 'power2.out' });
gsap.from('.scroll-arrow', { opacity: 0, duration: 2, y: 50, ease: 'power2.out', delay: 1 });

// 项目详情跳转逻辑
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
        const targetId = card.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);

        // 隐藏所有详情内容
        document.querySelectorAll('.detail-content').forEach(content => {
            content.style.display = 'none';
        });

        // 显示当前项目的详情内容
        if (targetElement) {
            targetElement.style.display = 'block';
            window.location.hash = `#${targetId}`; // 更新 URL hash
        }
    });
});

// 根据 URL hash 显示对应的项目详情
window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            targetElement.style.display = 'block';
        }
    }
});
// 图片轮播逻辑
function startCarousel(carousel) {
    const images = carousel.querySelectorAll('img');
    const prevButton = carousel.querySelector('.carousel-prev');
    const nextButton = carousel.querySelector('.carousel-next');
    let currentIndex = 0;

    function showImage(index) {
        // 隐藏所有图片
        images.forEach(img => img.classList.remove('active'));

        // 显示指定索引的图片
        images[index].classList.add('active');
    }

    function showNextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    function showPrevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    }

    // 自动轮播
    const interval = setInterval(showNextImage, 3000);

    // 点击下一张按钮
    nextButton.addEventListener('click', () => {
        clearInterval(interval); // 停止自动轮播
        showNextImage();
    });

    // 点击上一张按钮
    prevButton.addEventListener('click', () => {
        clearInterval(interval); // 停止自动轮播
        showPrevImage();
    });
}

// 初始化所有轮播
document.querySelectorAll('.image-carousel').forEach(carousel => {
    startCarousel(carousel);
});