"use client";

import {
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode
} from "react";
import {
  FiAlertCircle,
  FiCalendar,
  FiCheckCircle,
  FiClock,
  FiMail,
  FiPhone,
  FiSend,
  FiUser,
  FiUsers
} from "react-icons/fi";

import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { createReservation } from "@/lib/firestore";
import type { ReservationInput } from "@/types/firestore";

type ReservationFormState = {
  name: string;
  phone: string;
  email: string;
  people: string;
  date: string;
  time: string;
  comments: string;
};

type FieldName = keyof ReservationFormState;

const initialForm: ReservationFormState = {
  name: "",
  phone: "",
  email: "",
  people: "2",
  date: "",
  time: "",
  comments: ""
};

function getToday() {
  const date = new Date();
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 10);
}

function validateReservation(values: ReservationFormState) {
  const errors: Partial<Record<FieldName, string>> = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const people = Number(values.people);

  if (values.name.trim().length < 2) {
    errors.name = "Ingresa tu nombre.";
  }

  if (values.phone.trim().length < 7) {
    errors.phone = "Ingresa un teléfono válido.";
  }

  if (!emailPattern.test(values.email.trim())) {
    errors.email = "Ingresa un correo válido.";
  }

  if (!Number.isInteger(people) || people < 1) {
    errors.people = "Indica el número de personas.";
  }

  if (!values.date) {
    errors.date = "Selecciona la fecha.";
  }

  if (!values.time) {
    errors.time = "Selecciona la hora.";
  }

  if (values.comments.trim().length < 2) {
    errors.comments = "Agrega un comentario.";
  }

  return errors;
}

export function ReservationForm() {
  const [form, setForm] = useState<ReservationFormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const today = useMemo(() => getToday(), []);

  const updateField =
    (field: FieldName) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
      setErrors((current) => ({ ...current, [field]: undefined }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateReservation(form);
    setErrors(nextErrors);
    setStatus(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const payload: ReservationInput = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      people: Number(form.people),
      date: form.date,
      time: form.time,
      comments: form.comments.trim()
    };

    try {
      setIsSubmitting(true);
      await createReservation(payload);
      setForm(initialForm);
      setStatus({
        type: "success",
        text: "Reserva recibida. Te contactaremos para confirmar la disponibilidad."
      });
    } catch {
      setStatus({
        type: "error",
        text: "No pudimos guardar la reserva. Revisa la configuración de Firebase e inténtalo de nuevo."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reservas" className="bg-white py-20 sm:py-24 dark:bg-[#06111f]">
      <div className="section-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="Reservación de Mesas"
            title="Reserva con anticipación y disfruta El Lago con calma"
            description="Completa tus datos y el equipo del restaurante recibirá la solicitud directamente en Firestore para gestionar la confirmación."
          />

          <div className="mt-8 rounded-lg bg-lago-radial p-7 text-white shadow-premium">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-lago-aqua">
              Atención
            </p>
            <p className="mt-3 text-2xl font-bold">3506321235</p>
            <p className="mt-3 leading-7 text-white/75">
              También puedes comunicarte por teléfono o WhatsApp para solicitudes
              especiales, celebraciones o grupos familiares.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form
            onSubmit={handleSubmit}
            className="rounded-lg border border-slate-200 bg-lago-pearl p-5 shadow-premium sm:p-7 dark:border-white/10 dark:bg-white/[0.06]"
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Nombre"
                error={errors.name}
                icon={<FiUser />}
                input={
                  <input
                    className="input-field pl-11"
                    value={form.name}
                    onChange={updateField("name")}
                    placeholder="Tu nombre"
                    autoComplete="name"
                  />
                }
              />
              <FormField
                label="Teléfono"
                error={errors.phone}
                icon={<FiPhone />}
                input={
                  <input
                    className="input-field pl-11"
                    value={form.phone}
                    onChange={updateField("phone")}
                    placeholder="3506321235"
                    autoComplete="tel"
                    inputMode="tel"
                  />
                }
              />
              <FormField
                label="Correo"
                error={errors.email}
                icon={<FiMail />}
                input={
                  <input
                    className="input-field pl-11"
                    value={form.email}
                    onChange={updateField("email")}
                    placeholder="correo@ejemplo.com"
                    autoComplete="email"
                    inputMode="email"
                  />
                }
              />
              <FormField
                label="Número de personas"
                error={errors.people}
                icon={<FiUsers />}
                input={
                  <input
                    className="input-field pl-11"
                    value={form.people}
                    onChange={updateField("people")}
                    type="number"
                    min={1}
                    max={40}
                  />
                }
              />
              <FormField
                label="Fecha"
                error={errors.date}
                icon={<FiCalendar />}
                input={
                  <input
                    className="input-field pl-11"
                    value={form.date}
                    onChange={updateField("date")}
                    type="date"
                    min={today}
                  />
                }
              />
              <FormField
                label="Hora"
                error={errors.time}
                icon={<FiClock />}
                input={
                  <input
                    className="input-field pl-11"
                    value={form.time}
                    onChange={updateField("time")}
                    type="time"
                  />
                }
              />
            </div>

            <FormField
              label="Comentarios"
              error={errors.comments}
              input={
                <textarea
                  className="input-field mt-2 min-h-32 resize-y"
                  value={form.comments}
                  onChange={updateField("comments")}
                  placeholder="Cuéntanos si celebras una ocasión especial o tienes alguna solicitud."
                />
              }
            />

            {status ? (
              <div
                className={`mt-5 flex gap-3 rounded-md px-4 py-3 text-sm ${
                  status.type === "success"
                    ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-100"
                    : "bg-red-50 text-red-800 dark:bg-red-400/10 dark:text-red-100"
                }`}
              >
                {status.type === "success" ? (
                  <FiCheckCircle className="mt-0.5 shrink-0" />
                ) : (
                  <FiAlertCircle className="mt-0.5 shrink-0" />
                )}
                <span>{status.text}</span>
              </div>
            ) : null}

            <button
              type="submit"
              className="primary-button mt-6 w-full sm:w-auto"
              disabled={isSubmitting}
            >
              <FiSend size={18} />
              {isSubmitting ? "Enviando..." : "Enviar Reserva"}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function FormField({
  label,
  input,
  error,
  icon
}: {
  label: string;
  input: ReactNode;
  error?: string;
  icon?: ReactNode;
}) {
  return (
    <label className="mt-4 block text-sm font-semibold text-lago-navy first:mt-0 dark:text-white">
      {label}
      <span className="relative mt-2 block">
        {icon ? (
          <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-lago-blue">
            {icon}
          </span>
        ) : null}
        {input}
      </span>
      {error ? <span className="mt-2 block text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
