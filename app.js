class FoodRecommendationApp {
  constructor() {
    this.restaurants = [];
    this.currentLocation = null;
    this.init();
  }

  init() {
    this.bindEvents();
    this.getLocation();
  }

  bindEvents() {
    document.getElementById('randomBtn').addEventListener('click', () => this.randomRecommend());
    document.getElementById('closeBtn').addEventListener('click', () => this.closeModal());
    document.getElementById('modal').addEventListener('click', (e) => {
      if (e.target === document.getElementById('modal')) {
        this.closeModal();
      }
    });
    document.getElementById('navigateBtn').addEventListener('click', () => this.navigateToRestaurant());
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.currentLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          this.fetchRestaurants();
        },
        (error) => {
          console.error('获取位置失败:', error);
          this.currentLocation = { latitude: 31.2304, longitude: 121.4737 };
          this.fetchRestaurants();
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      this.currentLocation = { latitude: 31.2304, longitude: 121.4737 };
      this.fetchRestaurants();
    }
  }

  async fetchRestaurants() {
    this.showLoading();
    await new Promise(resolve => setTimeout(resolve, 1500));
    this.restaurants = this.generateMockRestaurants();
    this.renderRestaurants();
    this.hideLoading();
  }

  generateMockRestaurants() {
    const foodTypes = ['川菜', '粤菜', '日料', '西餐', '火锅', '烧烤', '甜品', '海鲜', '面食', '汉堡'];
    const emojis = ['🍜', '🍲', '🍣', '🍕', '🥘', '🍢', '🍰', '🦐', '🍝', '🍔'];
    
    return Array.from({ length: 20 }, (_, i) => {
      const typeIndex = Math.floor(Math.random() * foodTypes.length);
      const rating = (3.5 + Math.random() * 1.5).toFixed(1);
      const distance = Math.floor(Math.random() * 2000) + 100;
      
      return {
        id: i + 1,
        name: `${foodTypes[typeIndex]}餐厅${String(i + 1).padStart(2, '0')}`,
        type: foodTypes[typeIndex],
        emoji: emojis[typeIndex],
        rating: parseFloat(rating),
        distance,
        price: Math.floor(Math.random() * 100) + 50,
        tags: this.getRandomTags(typeIndex),
        dishes: this.getRandomDishes(typeIndex),
        reviews: this.getRandomReviews()
      };
    }).sort((a, b) => b.rating - a.rating);
  }

  getRandomTags(typeIndex) {
    const tagsMap = [
      ['麻辣', '鲜香', '正宗'],
      ['清淡', '鲜美', '地道'],
      ['新鲜', '精致', '正宗'],
      ['西式', '浪漫', '优雅'],
      ['麻辣', '鲜香', '热闹'],
      ['炭火', '孜然', '香气'],
      ['甜蜜', '精致', '颜值'],
      ['新鲜', '肥美', '鲜甜'],
      ['劲道', '香浓', '实惠'],
      ['多汁', '酥脆', '快捷']
    ];
    return tagsMap[typeIndex].slice(0, Math.floor(Math.random() * 3) + 1);
  }

  getRandomDishes(typeIndex) {
    const dishesMap = [
      [
        { name: '水煮鱼', price: 68 },
        { name: '麻婆豆腐', price: 28 },
        { name: '回锅肉', price: 38 },
        { name: '宫保鸡丁', price: 32 }
      ],
      [
        { name: '白切鸡', price: 58 },
        { name: '清蒸鲈鱼', price: 68 },
        { name: '叉烧饭', price: 32 },
        { name: '蛋挞', price: 18 }
      ],
      [
        { name: '三文鱼刺身', price: 88 },
        { name: '寿司拼盘', price: 58 },
        { name: '天妇罗', price: 48 },
        { name: '味噌汤', price: 18 }
      ],
      [
        { name: '牛排', price: 128 },
        { name: '披萨', price: 68 },
        { name: '意面', price: 48 },
        { name: '沙拉', price: 38 }
      ],
      [
        { name: '招牌牛肉', price: 88 },
        { name: '毛肚', price: 48 },
        { name: '虾滑', price: 38 },
        { name: '鸭血', price: 28 }
      ],
      [
        { name: '烤羊肉串', price: 38 },
        { name: '烤鸡翅', price: 28 },
        { name: '烤茄子', price: 18 },
        { name: '烤玉米', price: 12 }
      ],
      [
        { name: '提拉米苏', price: 38 },
        { name: '芝士蛋糕', price: 42 },
        { name: '水果拼盘', price: 32 },
        { name: '奶茶', price: 18 }
      ],
      [
        { name: '清蒸龙虾', price: 168 },
        { name: '蒜蓉扇贝', price: 58 },
        { name: '香辣蟹', price: 88 },
        { name: '炒花蛤', price: 38 }
      ],
      [
        { name: '牛肉面', price: 32 },
        { name: '葱油拌面', price: 18 },
        { name: '小笼包', price: 28 },
        { name: '馄饨', price: 22 }
      ],
      [
        { name: '招牌汉堡', price: 38 },
        { name: '薯条', price: 18 },
        { name: '炸鸡', price: 28 },
        { name: '可乐', price: 12 }
      ]
    ];
    return dishesMap[typeIndex];
  }

  getRandomReviews() {
    const users = ['小明', '小红', '大壮', '小美', '阿强'];
    const contents = [
      '味道非常好，环境也很不错，下次还会再来！',
      '服务态度很好，菜品新鲜，价格实惠。',
      '强烈推荐！真的很好吃，性价比很高。',
      '环境优雅，适合约会，菜品精致。',
      '味道正宗，分量很足，吃得很满意。'
    ];
    
    return Array.from({ length: Math.floor(Math.random() * 3) + 1 }, () => ({
      userName: users[Math.floor(Math.random() * users.length)],
      rating: Math.floor(Math.random() * 2) + 4,
      content: contents[Math.floor(Math.random() * contents.length)]
    }));
  }

  showLoading() {
    document.getElementById('loading').style.display = 'block';
  }

  hideLoading() {
    document.getElementById('loading').style.display = 'none';
  }

  renderRestaurants() {
    const list = document.getElementById('restaurantsList');
    list.innerHTML = '';

    if (this.restaurants.length === 0) {
      list.innerHTML = `
        <div class="empty-state">
          <div class="icon">😔</div>
          <h3>暂无附近餐厅</h3>
          <p>请检查您的位置权限</p>
        </div>
      `;
      return;
    }

    document.getElementById('restaurantCount').textContent = this.restaurants.length;

    this.restaurants.forEach(restaurant => {
      const card = document.createElement('div');
      card.className = 'restaurant-card';
      card.addEventListener('click', () => this.showRestaurantDetail(restaurant));
      card.innerHTML = `
        <div class="restaurant-card-image">${restaurant.emoji}</div>
        <div class="restaurant-card-info">
          <div class="restaurant-card-name">${restaurant.name}</div>
          <div class="restaurant-card-tags">
            ${restaurant.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
          <div class="restaurant-card-footer">
            <div class="restaurant-card-rating">
              <svg viewBox="0 0 24 24" fill="#ffb400">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span>${restaurant.rating}</span>
            </div>
            <div class="restaurant-card-distance">${restaurant.distance}m</div>
          </div>
        </div>
      `;
      list.appendChild(card);
    });
  }

  randomRecommend() {
    if (this.restaurants.length === 0) {
      alert('暂无餐厅数据');
      return;
    }
    
    const randomIndex = Math.floor(Math.random() * this.restaurants.length);
    const restaurant = this.restaurants[randomIndex];
    this.showRestaurantDetail(restaurant);
  }

  showRestaurantDetail(restaurant) {
    document.getElementById('restaurantImage').textContent = restaurant.emoji;
    document.getElementById('restaurantName').textContent = restaurant.name;
    document.getElementById('rating').textContent = restaurant.rating;
    document.getElementById('distance').textContent = `${restaurant.distance}m`;
    document.getElementById('restaurantTags').innerHTML = 
      restaurant.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    document.getElementById('price').textContent = `¥${restaurant.price}/人`;
    
    document.getElementById('dishes').innerHTML = restaurant.dishes
      .map(dish => `
        <div class="dish-item">
          <span class="dish-name">${dish.name}</span>
          <span class="dish-price">¥${dish.price}</span>
        </div>
      `).join('');
    
    document.getElementById('reviews').innerHTML = restaurant.reviews
      .map(review => `
        <div class="review-item">
          <div class="review-header">
            <div class="review-avatar">${review.userName[0]}</div>
            <div class="review-info">
              <div class="review-name">${review.userName}</div>
              <div class="review-rating">${'⭐'.repeat(review.rating)}</div>
            </div>
          </div>
          <div class="review-content">${review.content}</div>
        </div>
      `).join('');

    this.currentRestaurant = restaurant;
    document.getElementById('modal').classList.add('active');
  }

  closeModal() {
    document.getElementById('modal').classList.remove('active');
  }

  navigateToRestaurant() {
    if (this.currentRestaurant && this.currentLocation) {
      const url = `https://maps.google.com/maps?q=${this.currentLocation.latitude},${this.currentLocation.longitude}&daddr=${this.currentRestaurant.name}`;
      window.open(url, '_blank');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new FoodRecommendationApp();
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  }
});