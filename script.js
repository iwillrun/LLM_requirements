document.addEventListener('DOMContentLoaded', function() {
  let products = [];

  fetch('AI_production_list_car_relation.json')
      .then(response => response.json())
      .then(data => {
          products = data;
          displayProducts(products);

          document.getElementById('search-bar').addEventListener('input', function() {
              const searchTerm = this.value.toLowerCase();
              const filteredProducts = products.filter(product => 
                  product.product_name.toLowerCase().includes(searchTerm) ||
                  product.产品简介.toLowerCase().includes(searchTerm) ||
                  product.用户故事.toLowerCase().includes(searchTerm)
              );
              displayProducts(filteredProducts);
          });

          document.getElementById('sort-asc').addEventListener('click', function() {
              const sortedProducts = products.slice().sort((a, b) => a.车载相关性 - b.车载相关性);
              displayProducts(sortedProducts);
          });

          document.getElementById('sort-desc').addEventListener('click', function() {
              const sortedProducts = products.slice().sort((a, b) => b.车载相关性 - a.车载相关性);
              displayProducts(sortedProducts);
          });
      })
      .catch(error => console.error('Error fetching data:', error));

  function displayProducts(products) {
      const productList = document.getElementById('product-list');
      productList.innerHTML = '';

      products.forEach(product => {
          const productRow = document.createElement('tr');
          productRow.innerHTML = `
              <td>${product.product_name}</td>
              <td>${product.产品简介}</td>
              <td>${product.用户故事}</td>
              <td class="features-preview">${product.功能描述文档.substring(0, 100)}...</td>
              <td>${product.车载相关性}</td>
              <td class="features-preview">${product.评估过程.substring(0, 50)}...</td>
              <td class="features-preview">${product.车载应用场景.substring(0, 50)}...</td>
          `;
          productRow.addEventListener('click', () => showProductDetails(product));
          productList.appendChild(productRow);
      });
  }

  function showProductDetails(product) {
      const modal = document.getElementById('modal');
      const modalProductName = document.getElementById('modal-product-name');
      const modalProductIntro = document.getElementById('modal-product-intro');
      const modalProductFeatures = document.getElementById('modal-product-features');
      const modalProductStory = document.getElementById('modal-product-story');
      const modalproductrelation = document.getElementById('modal-product-relation');
      const modalproductrelationreview = document.getElementById('modal-product-relation-review');
      const modalproductrelationscenario = document.getElementById('modal-product-relation-scenario');

      modalProductName.textContent = product.product_name;
      modalProductIntro.textContent = product.产品简介;
      modalProductStory.textContent = product.用户故事;
      modalproductrelation.textContent = product.车载相关性;
      modalproductrelationreview.textContent = product.评估过程;

      // 使用 marked.js 渲染 Markdown 内容
      modalProductFeatures.innerHTML = marked.parse(product.功能描述文档);
      modalproductrelationscenario.innerHTML = `<h3>功能描述</h3>${marked.parse(product.车载应用场景)}`;

      modal.style.display = 'block';
  }

  function closeModal() {
      const modal = document.getElementById('modal');
      modal.style.display = 'none';
  }

  document.querySelector('.close').addEventListener('click', closeModal);

  window.addEventListener('click', function(event) {
      const modal = document.getElementById('modal');
      if (event.target === modal) {
          closeModal();
      }
  });

  // 禁用右键菜单
  document.addEventListener('contextmenu', function(event) {
      event.preventDefault();
  });

  // 禁用复制快捷键
  document.addEventListener('keydown', function(event) {
      if ((event.ctrlKey || event.metaKey) && (event.key === 'c' || event.key === 'C')) {
          event.preventDefault();
      }
  });

  // 禁用复制事件
  document.addEventListener('copy', function(event) {
      event.preventDefault();
      alert('复制功能已被禁用！');
  });

  // 禁用选择事件
  document.addEventListener('selectstart', function(event) {
      event.preventDefault();
      alert('选择功能已被禁用！');
  });
});