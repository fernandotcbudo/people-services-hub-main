import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PhoneScripts from "./pages/PhoneScripts";
import EmailTemplates from "./pages/EmailTemplates";
import JiraResponses from "./pages/JiraResponses";
import Security from "./pages/Security";
import SearchPage from "./pages/SearchPage";
import Glossary from "./pages/Glossary";
import { GenericPage, CountryPage } from "./pages/GenericPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/phone-scripts" element={<PhoneScripts />} />
          <Route path="/email-templates" element={<EmailTemplates />} />
          <Route path="/jira-responses" element={<JiraResponses />} />
          <Route path="/security" element={<Security />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/glossary" element={<Glossary />} />
          
          {/* Generic Pages */}
          <Route path="/payroll-scripts" element={<GenericPage pageKey="payroll-scripts" />} />
          <Route path="/ec-sf-workflows" element={<GenericPage pageKey="ec-sf-workflows" />} />
          <Route path="/favorites" element={<GenericPage pageKey="favorites" />} />
          <Route path="/recent" element={<GenericPage pageKey="recent" />} />
          <Route path="/help" element={<GenericPage pageKey="help" />} />
          <Route path="/call-flow" element={<GenericPage pageKey="call-flow" />} />
          <Route path="/security-protocol" element={<GenericPage pageKey="security-protocol" />} />
          <Route path="/decision-tree" element={<GenericPage pageKey="decision-tree" />} />
          
          {/* Country Pages */}
          <Route path="/country/:country" element={<CountryPage />} />
          
          {/* Footer Links */}
          <Route path="/documentation" element={<GenericPage pageKey="help" />} />
          <Route path="/training" element={<GenericPage pageKey="help" />} />
          <Route path="/policies" element={<GenericPage pageKey="help" />} />
          <Route path="/compliance" element={<GenericPage pageKey="help" />} />
          <Route path="/contact-it" element={<GenericPage pageKey="help" />} />
          <Route path="/report-issue" element={<GenericPage pageKey="help" />} />
          <Route path="/feedback" element={<GenericPage pageKey="help" />} />
          <Route path="/privacy" element={<GenericPage pageKey="help" />} />
          <Route path="/terms" element={<GenericPage pageKey="help" />} />
          <Route path="/cookies" element={<GenericPage pageKey="help" />} />
          <Route path="/data-protection" element={<GenericPage pageKey="help" />} />
          
          {/* Template detail pages */}
          <Route path="/templates/:templateId" element={<GenericPage pageKey="help" />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
