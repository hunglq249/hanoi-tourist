'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckCircle, Loader2, Car, Building2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { CARS, PICKUP_LOCATIONS } from '@/lib/data';
import { BookingFormData } from '@/lib/types';

export default function BookingForm() {
  const t = useTranslations('booking');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bookingType, setBookingType] = useState<'self-drive' | 'long-term'>('self-drive');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>();

  const onSubmit = async (data: BookingFormData) => {
    setLoading(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, type: bookingType }),
      });
      if (res.ok) {
        setSubmitted(true);
        reset();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="section-padding bg-[#0A0A0A]">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left info */}
          <div className="lg:sticky lg:top-28">
            <div className="section-label mb-4">{t('label')}</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              {t('heading1')}
              <br />
              <span className="gradient-text">{t('headingGreen')}</span>
            </h2>
            <p className="text-[#8A8A8A] text-lg leading-relaxed mb-8">
              {t('description')}
            </p>

            <div className="space-y-4">
              {[
                { step: '01', title: t('step1_title'), desc: t('step1_desc') },
                { step: '02', title: t('step2_title'), desc: t('step2_desc') },
                { step: '03', title: t('step3_title'), desc: t('step3_desc') },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#006400] to-[#008000] flex items-center justify-center flex-shrink-0 text-black font-bold text-sm">
                    {step}
                  </div>
                  <div>
                    <div className="text-white font-semibold">{title}</div>
                    <div className="text-[#8A8A8A] text-sm">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 bg-[#141414] border border-[#006400]/20 rounded-2xl p-5">
              <div className="text-[#006400] text-sm font-semibold mb-1">{t('commitment_title')}</div>
              <p className="text-[#8A8A8A] text-sm">{t('commitment_text')}</p>
            </div>
          </div>

          {/* Right form */}
          <div>
            {submitted ? (
              <div className="bg-[#141414] border border-[#006400]/30 rounded-2xl p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-[#006400]/10 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle size={32} className="text-[#006400]" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-3">
                  {t('success_title')}
                </h3>
                <p className="text-[#8A8A8A] text-base mb-6">{t('success_desc')}</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-outline-gold text-sm"
                >
                  {t('book_another')}
                </button>
              </div>
            ) : (
              <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-8">
                {/* Type selector */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {[
                    { key: 'self-drive', icon: Car, label: t('type_self') },
                    { key: 'long-term', icon: Building2, label: t('type_long') },
                  ].map(({ key, icon: Icon, label }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setBookingType(key as 'self-drive' | 'long-term')}
                      className={`flex items-center gap-2 p-3 rounded-xl border text-sm font-medium transition-all ${
                        bookingType === key
                          ? 'bg-[#006400]/10 border-[#006400] text-[#006400]'
                          : 'bg-[#1A1A1A] border-[#2A2A2A] text-[#8A8A8A] hover:border-[#3A3A3A]'
                      }`}
                    >
                      <Icon size={16} />
                      {label}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  {/* Name + Phone */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">
                        {t('name_label')} <span className="text-[#006400]">*</span>
                      </label>
                      <input
                        {...register('fullName', { required: t('name_error') })}
                        className="input-dark"
                        placeholder={t('name_placeholder')}
                      />
                      {errors.fullName && (
                        <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">
                        {t('phone_label')} <span className="text-[#006400]">*</span>
                      </label>
                      <input
                        {...register('phone', {
                          required: t('phone_error'),
                          pattern: { value: /^[0-9]{10,11}$/, message: t('phone_invalid') },
                        })}
                        className="input-dark"
                        placeholder={t('phone_placeholder')}
                        type="tel"
                      />
                      {errors.phone && (
                        <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">
                      {t('email_label')} <span className="text-[#666]">{t('email_optional')}</span>
                    </label>
                    <input
                      {...register('email')}
                      className="input-dark"
                      placeholder="email@example.com"
                      type="email"
                    />
                  </div>

                  {/* Car model */}
                  <div>
                    <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">
                      {t('car_label')} <span className="text-[#006400]">*</span>
                    </label>
                    <select
                      {...register('carModel', { required: t('car_error') })}
                      className="input-dark appearance-none"
                    >
                      <option value="">{t('car_placeholder')}</option>
                      {CARS.map((car) => (
                        <option key={car.id} value={car.name}>
                          {car.name} — {car.seats} {t('seats_suffix')}, {car.transmission === 'auto' ? t('auto_label') : t('manual_label')}
                        </option>
                      ))}
                      <option value="consult">{t('car_consult')}</option>
                    </select>
                    {errors.carModel && (
                      <p className="text-red-400 text-xs mt-1">{errors.carModel.message}</p>
                    )}
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">
                        {t('start_label')} <span className="text-[#006400]">*</span>
                      </label>
                      <input
                        {...register('startDate', { required: t('start_error') })}
                        className="input-dark"
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                      />
                      {errors.startDate && (
                        <p className="text-red-400 text-xs mt-1">{errors.startDate.message}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">
                        {t('end_label')} <span className="text-[#006400]">*</span>
                      </label>
                      <input
                        {...register('endDate', { required: t('end_error') })}
                        className="input-dark"
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                      />
                      {errors.endDate && (
                        <p className="text-red-400 text-xs mt-1">{errors.endDate.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Pickup location */}
                  <div>
                    <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">
                      {t('pickup_label')} <span className="text-[#006400]">*</span>
                    </label>
                    <select
                      {...register('pickupLocation', { required: t('pickup_error') })}
                      className="input-dark appearance-none"
                    >
                      <option value="">{t('pickup_placeholder')}</option>
                      {PICKUP_LOCATIONS.map((loc) => (
                        <option key={loc} value={loc}>{loc}</option>
                      ))}
                    </select>
                    {errors.pickupLocation && (
                      <p className="text-red-400 text-xs mt-1">{errors.pickupLocation.message}</p>
                    )}
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-[#CCCCCC] text-sm font-medium mb-1.5">
                      {t('notes_label')}
                    </label>
                    <textarea
                      {...register('notes')}
                      className="input-dark resize-none"
                      rows={3}
                      placeholder={t('notes_placeholder')}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gold w-full flex items-center justify-center gap-2 text-base py-4"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        {t('submitting')}
                      </>
                    ) : (
                      t('submit_btn')
                    )}
                  </button>

                  <p className="text-[#666] text-xs text-center">{t('privacy_note')}</p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
