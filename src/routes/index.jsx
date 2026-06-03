import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

// Lazy-loaded pages for code splitting
const HomePage         = lazy(() => import('../pages/Home'));
const AboutPage        = lazy(() => import('../pages/About'));
const ServicesPage     = lazy(() => import('../pages/Services'));
const ITInfraPage      = lazy(() => import('../pages/ITInfrastructure'));
const ClientsPage      = lazy(() => import('../pages/Clients'));
const TestimonialsPage = lazy(() => import('../pages/Testimonials'));
const ContactPage      = lazy(() => import('../pages/Contact'));
const NotFoundPage     = lazy(() => import('../pages/NotFound'));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-brand-200 border-t-brand-600 rounded-full animate-spin" />
        <p className="text-sm text-slate-400">Loading…</p>
      </div>
    </div>
  );
}

function withSuspense(Component) {
  return (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true,            element: withSuspense(HomePage) },
      { path: 'about',          element: withSuspense(AboutPage) },
      { path: 'services',       element: withSuspense(ServicesPage) },
      { path: 'it-infrastructure', element: withSuspense(ITInfraPage) },
      { path: 'clients',        element: withSuspense(ClientsPage) },
      { path: 'testimonials',   element: withSuspense(TestimonialsPage) },
      { path: 'contact',        element: withSuspense(ContactPage) },
      { path: '*',              element: withSuspense(NotFoundPage) },
    ],
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
