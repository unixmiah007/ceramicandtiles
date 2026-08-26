import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TopBar from './components/TopBar';
import Footer from './components/Footer';
import SeasonalBanner from './components/SeasonalBanner';
import HomePage from './pages/HomePage';
import ExperiencePage from './pages/ExperiencePage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import WhyPortilloPage from './pages/WhyPortilloPage';
import ValueDetailPage from './pages/ValueDetailPage';
import ContactPage from './pages/ContactPage';
import QuoteWizardPage from './pages/QuoteWizardPage';
import FAQPage from './pages/FAQPage';
import ServiceAreaPage from './pages/ServiceAreaPage';
import BeforeAfterPage from './pages/BeforeAfterPage';
import EstimatePage from './pages/EstimatePage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import CaseStudyPage from './pages/CaseStudyPage';
import ChecklistPage from './pages/ChecklistPage';
import BackToTop from './components/BackToTop';
import LiveChat from './components/LiveChat';
import EstimateFloater from './components/EstimateFloater';
import Breadcrumbs from './components/Breadcrumbs';

export default function App() {
  return (
    <div className="app">
      <SeasonalBanner />
      <div className="site-header">
        <TopBar />
        <Header />
      </div>
      <main>
        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/experience/:projectId" element={<CaseStudyPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:serviceId" element={<ServiceDetailPage />} />
          <Route path="/why-portillo" element={<WhyPortilloPage />} />
          <Route path="/why-portillo/:valueId" element={<ValueDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/quote-wizard" element={<QuoteWizardPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/service-area" element={<ServiceAreaPage />} />
          <Route path="/before-after" element={<BeforeAfterPage />} />
          <Route path="/estimate" element={<EstimatePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/category/:category" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/checklist" element={<ChecklistPage />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
      <LiveChat />
      <EstimateFloater />
    </div>
  );
}
