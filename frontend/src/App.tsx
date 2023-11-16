import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import DetailPage from './Pages/Details/Details';
import Cart from './components/Cart/Cart';
import Contact from './Pages/Contact/Contact';
import About from './Pages/About/About';
import Payment from './Pages/Payment/Payment';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import CancellationPolicy from './Pages/cancellationPolicy/cancellationPolicy';
import PaymentConfirmation from './Pages/PaymentConfirmation/confirmation';

export default function App() {

  return (
    <div className='app-container'>
      <AuthProvider>
        <CartProvider>
          <Header/>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/details/:productId" element={<DetailPage/>} />
              <Route path="/kontakt" element={<Contact/>} />
              <Route path="/om" element={<About/>} />
              <Route path="/betalning" element={<Payment/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/registrera" element={<Register/>} />
              <Route path="/avbokningspolicy" element={<CancellationPolicy/>} />
              <Route path="/paymentconfirmation" element={<PaymentConfirmation productName={''} imageUrls={[]} startDate={''} endDate={''} guests={''} totalPrice={0}/>} />
            </Routes>
            <Cart/>
          <Footer/>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}
