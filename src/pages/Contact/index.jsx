import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, CheckCircle, Shield, Loader2, SendHorizontal } from 'lucide-react';
import SEOHead from '../../components/common/SEOHead';
import PageHero from '../../components/common/PageHero';
import { FormField, TextInput, TextArea, SelectInput } from '../../components/forms/FormComponents';
import { SEO } from '../../constants/seo';
import { CONTACT_INFO, SERVICE_OPTIONS, FORM_FIELDS } from '../../constants/contact';
import { submitContactForm } from '../../services/contactService';

const iconMap = {
  Phone,
  Mail,
  MapPin,
  Clock
};

function ContactInfoCard({ item }) {
  const IconComponent = iconMap[item.icon];

  const inner = (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-md bg-accent-subtle text-accent flex items-center justify-center shrink-0">
        {IconComponent && <IconComponent size={20} strokeWidth={1.5} />}
      </div>
      <div>
        <div className="text-xs font-mono font-semibold uppercase tracking-widest text-text-secondary/50 mb-1">
          {item.label}
        </div>
        <div className="text-sm font-semibold text-text-primary">{item.value}</div>
        {item.value2 && (
          <div className="text-sm text-text-secondary mt-0.5">{item.value2}</div>
        )}
      </div>
    </div>
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        target={item.href.startsWith('http') ? '_blank' : undefined}
        rel="noopener noreferrer"
        className="card p-5 hover:border-accent group block"
      >
        {inner}
      </a>
    );
  }
  return <div className="card p-5 bg-bg">{inner}</div>;
}

function SuccessState({ onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center text-center py-16 px-8 bg-bg"
    >
      <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
        <CheckCircle size={32} className="text-emerald-600" strokeWidth={1.5} />
      </div>
      <h3 className="font-headings text-xl font-bold text-text-primary mb-2">
        Message Received!
      </h3>
      <p className="text-text-secondary text-sm max-w-sm mb-6">
        Thank you for reaching out. One of our consultants will contact you within 24 business hours.
      </p>
      <button
        onClick={onReset}
        className="btn-secondary text-sm"
      >
        Send Another Message
      </button>
    </motion.div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onBlur' });

  const selectedService = watch('service', '');

  const onSubmit = async (data) => {
    setStatus('loading');
    setServerError('');
    try {
      await submitContactForm(data);
      setStatus('success');
      reset();
    } catch (err) {
      setStatus('error');
      setServerError(
        err?.response?.data?.message ||
          'Something went wrong. Please try again or call us directly.'
      );
    }
  };

  if (status === 'success') {
    return <SuccessState onReset={() => setStatus('idle')} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <FormField label={FORM_FIELDS.name.label} error={errors.name?.message} required>
          <TextInput
            register={register('name', {
              required: 'Full name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
            })}
            error={errors.name?.message}
            placeholder={FORM_FIELDS.name.placeholder}
            autoComplete="name"
          />
        </FormField>
        <FormField label={FORM_FIELDS.company.label} error={errors.company?.message} required>
          <TextInput
            register={register('company', { required: 'Company name is required' })}
            error={errors.company?.message}
            placeholder={FORM_FIELDS.company.placeholder}
            autoComplete="organization"
          />
        </FormField>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <FormField label={FORM_FIELDS.email.label} error={errors.email?.message} required>
          <TextInput
            register={register('email', {
              required: 'Email address is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address',
              },
            })}
            error={errors.email?.message}
            placeholder={FORM_FIELDS.email.placeholder}
            type="email"
            autoComplete="email"
          />
        </FormField>
        <FormField label={FORM_FIELDS.phone.label} error={errors.phone?.message}>
          <TextInput
            register={register('phone', {
              pattern: {
                value: /^[+\d\s\-()]{7,15}$/,
                message: 'Please enter a valid phone number',
              },
            })}
            error={errors.phone?.message}
            placeholder={FORM_FIELDS.phone.placeholder}
            type="tel"
            autoComplete="tel"
          />
        </FormField>
      </div>

      <FormField label={FORM_FIELDS.service.label} error={errors.service?.message} required>
        <SelectInput
          register={register('service', { required: 'Please select a service' })}
          error={errors.service?.message}
          options={SERVICE_OPTIONS}
          placeholder={FORM_FIELDS.service.placeholder}
          value={selectedService}
        />
      </FormField>

      <FormField label={FORM_FIELDS.message.label} error={errors.message?.message} required>
        <TextArea
          register={register('message', {
            required: 'Please describe your requirements',
            minLength: { value: 20, message: 'Please provide at least 20 characters' },
          })}
          error={errors.message?.message}
          placeholder={FORM_FIELDS.message.placeholder}
          rows={FORM_FIELDS.message.rows}
        />
      </FormField>

      {/* Honeypot spam protection */}
      <input
        type="text"
        tabIndex="-1"
        aria-hidden="true"
        className="hidden"
        {...register('_honey')}
      />

      <AnimatePresence>
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-2.5 p-4 bg-red-50 border border-red-100 rounded-lg"
            role="alert"
          >
            <Shield size={16} className="text-red-500 shrink-0 mt-0.5" strokeWidth={1.5} />
            <p className="text-sm text-red-700">{serverError}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full justify-center py-3 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send Message
            <SendHorizontal size={16} strokeWidth={1.5} />
          </>
        )}
      </button>

      <p className="text-xs text-text-secondary/60 text-center">
        By submitting this form you agree to our Privacy Policy. We never share your data with third parties.
      </p>
    </form>
  );
}

export default function ContactPage() {
  return (
    <>
      <SEOHead {...SEO.contact} />
      <PageHero
        tag="Contact Us"
        title="Let's Talk About Your IT Needs"
        subtitle="Whether you need a quick consultation or a full infrastructure assessment, our team is ready to help. Reach out and hear back within 24 hours."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="section-padding bg-bg">
        <div className="container-xl">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Left: info */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <h2 className="font-headings text-2xl font-bold text-text-primary mb-2">
                  Get in Touch
                </h2>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Our team of enterprise IT consultants is available during business hours and for emergency support 24×7.
                </p>
              </div>

              <div className="space-y-3">
                {CONTACT_INFO.map((item) => (
                  <ContactInfoCard key={item.label} item={item} />
                ))}
              </div>

              {/* Map embed */}
              <div className="rounded-lg overflow-hidden border border-border shadow-sm">
                <iframe
                  title="Pratham Tech Care Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.9!2d72.855!3d19.0896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA1JzIyLjYiTiA3MsKwNTEnMTguMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="220"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3">
              <div className="card p-8 lg:p-10 bg-bg">
                <div className="mb-8">
                  <h2 className="font-headings text-xl font-bold text-text-primary mb-1">
                    Send Us a Message
                  </h2>
                  <p className="text-sm text-text-secondary">
                    Fill out the form and a consultant will reach out to you within 24 business hours.
                  </p>
                </div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
