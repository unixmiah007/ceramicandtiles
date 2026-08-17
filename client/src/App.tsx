import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ExperiencePage from './pages/ExperiencePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import WhyPortilloPage from './pages/WhyPortilloPage';
import ValueDetailPage from './pages/ValueDetailPage';
import ContactPage from './pages/ContactPage';
import QuoteWizardPage from './pages/QuoteWizardPage';
import BackToTop from './components/BackToTop';
import LiveChat from './components/LiveChat';

export default function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
          <Route path="/why-portillo" element={<WhyPortilloPage />} />
          <Route path="/why-portillo/:valueId" element={<ValueDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/quote-wizard" element={<QuoteWizardPage />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
      <LiveChat />
    </div>
  );
}
