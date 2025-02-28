# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
<!--  -->


E-Trendz/
└─ APP/
   ├─ Backend/
   │  ├─ .env
   │  ├─ config/
   │  │  ├─ db.js
   │  │  └─ keys.js
   │  ├─ controllers/
   │  │  ├─ authController.js
   │  │  ├─ cartController.js
   │  │  ├─ orderController.js
   │  │  ├─ productController.js
   │  │  └─ userController.js
   │  ├─ middleware/
   │  │  ├─ authMiddleware.js
   │  │  ├─ errorHandler.js
   │  │  └─ uploadMiddleware.js
   │  ├─ models/
   │  │  ├─ Cart.js
   │  │  ├─ Order.js
   │  │  ├─ Product.js
   │  │  └─ User.js
   │  ├─ package-lock.json
   │  ├─ package.json
   │  ├─ routes/
   │  │  ├─ authRoutes.js
   │  │  ├─ cartRoutes.js
   │  │  ├─ orderRoutes.js
   │  │  ├─ productRoutes.js
   │  │  ├─ uploadRoutes.js
   │  │  └─ userRoutes.js
   │  ├─ seed/
   │  │  └─ seedData.js
   │  ├─ server.js
   │  └─ utils/
   │     ├─ generateToken.js
   │     └─ helpers.js
   └─ Frontend/
      ├─ .gitignore
      ├─ config.json
      ├─ eslint.config.js
      ├─ index.html
      ├─ package-lock.json
      ├─ package.json
      ├─ postcss.config.js
      ├─ public/
      │  └─ vite.svg
      ├─ README.md
      ├─ src/
      │  ├─ App.jsx
      │  ├─ assets/
      │  │  ├─ Home/
      │  │  │  ├─ books.jpg
      │  │  │  ├─ buynowimg.jpg
      │  │  │  ├─ electronics.jpg
      │  │  │  ├─ exploreimg.jpg
      │  │  │  ├─ fashion2.jpg
      │  │  │  ├─ home2.jpg
      │  │  │  ├─ rollerimg/
      │  │  │  │  ├─ pr1.webp
      │  │  │  │  ├─ pr10.webp
      │  │  │  │  ├─ pr2.webp
      │  │  │  │  ├─ pr3.jpeg
      │  │  │  │  ├─ pr4.webp
      │  │  │  │  ├─ pr5.jpeg
      │  │  │  │  ├─ pr6.webp
      │  │  │  │  ├─ pr7.webp
      │  │  │  │  ├─ pr8.jpeg
      │  │  │  │  └─ pr9.jpeg
      │  │  │  ├─ shopnowimg.jpg
      │  │  │  └─ sports2.jpg
      │  │  └─ imageImports.js
      │  ├─ components/
      │  │  ├─ Carousel.jsx
      │  │  ├─ Footer.jsx
      │  │  ├─ Navbar.jsx
      │  │  ├─ RollingGallery.jsx
      │  │  ├─ RotatingText.jsx
      │  │  ├─ ScrollVelocity.jsx
      │  │  └─ Timer.jsx
      │  ├─ firebase/
      │  │  └─ config.js
      │  ├─ index.css
      │  ├─ main.jsx
      │  ├─ pages/
      │  │  ├─ About.jsx
      │  │  ├─ Admin.jsx
      │  │  ├─ Cart.jsx
      │  │  ├─ Checkout.jsx
      │  │  ├─ Contact.jsx
      │  │  ├─ Home.jsx
      │  │  ├─ Login.jsx
      │  │  ├─ ProductDetail.jsx
      │  │  ├─ Products.jsx
      │  │  ├─ Profile.jsx
      │  │  ├─ Register.jsx
      │  │  └─ wishList.jsx
      │  └─ store/
      │     ├─ slices/
      │     │  ├─ authSlice.js
      │     │  ├─ cartSlice.js
      │     │  ├─ categorySlice.js
      │     │  ├─ productSlice.js
      │     │  └─ wishlistSlice.js
      │     └─ store.js
      ├─ tailwind.config.js
      └─ vite.config.js
