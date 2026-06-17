"use client";

import { useEffect, useState, type FormEvent } from "react";
import { FaQuoteLeft, FaRegStar, FaStar } from "react-icons/fa";
import { FiAlertCircle, FiCheckCircle, FiSend } from "react-icons/fi";

import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { createReview, fetchApprovedReviews } from "@/lib/reviews";
import type { ApprovedReview } from "@/types/firestore";

export function ReviewsSection() {
  const [reviews, setReviews] = useState<ApprovedReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    let active = true;

    async function loadReviews() {
      try {
        const data = await fetchApprovedReviews();
        if (active) {
          setReviews(data);
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    loadReviews();

    return () => {
      active = false;
    };
  }, []);

  const submitReview = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    if (name.trim().length < 2 || comment.trim().length < 2 || rating < 1) {
      setStatus({
        type: "error",
        text: "Completa tu nombre, calificación y comentario."
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const savedReview = await createReview({
        name: name.trim(),
        rating,
        comment: comment.trim()
      });
      setReviews((currentReviews) => [
        savedReview,
        ...currentReviews.filter((review) => review.id !== savedReview.id)
      ].slice(0, 8));
      setName("");
      setRating(5);
      setComment("");
      setStatus({
        type: "success",
        text: "Gracias. Tu reseña fue publicada correctamente."
      });
    } catch {
      setStatus({
        type: "error",
        text: "No pudimos guardar la reseña. Revisa la conexión de MySQL en Railway."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="opiniones" className="bg-lago-pearl py-20 sm:py-24 dark:bg-[#071827]">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Opiniones y Reseñas"
            title="Experiencias de quienes ya nos visitaron"
            description="Comparte tu experiencia y mira las opiniones más recientes de nuestros clientes."
          />
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div className="grid gap-5 md:grid-cols-2">
              {isLoading ? (
                <ReviewEmpty text="Cargando reseñas..." />
              ) : reviews.length > 0 ? (
                reviews.map((review) => (
                  <article
                    key={review.id}
                    className="rounded-lg border border-slate-200 bg-white p-6 shadow-soft dark:border-white/10 dark:bg-white/[0.07]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-lago-navy dark:text-white">
                          {review.name}
                        </h3>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                          Reseña publicada
                        </p>
                      </div>
                      <FaQuoteLeft className="text-lago-blue/40" size={23} />
                    </div>
                    <Stars value={review.rating} className="mt-5" />
                    <p className="mt-4 leading-7 text-slate-600 dark:text-white/70">
                      {review.comment}
                    </p>
                  </article>
                ))
              ) : (
                <ReviewEmpty text="Las reseñas aparecerán aquí." />
              )}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form
              onSubmit={submitReview}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-premium dark:border-white/10 dark:bg-white/[0.06]"
              noValidate
            >
              <h3 className="text-2xl font-bold text-lago-navy dark:text-white">
                Escribe tu reseña
              </h3>
              <label className="mt-5 block text-sm font-semibold text-lago-navy dark:text-white">
                Nombre
                <input
                  className="input-field mt-2"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Tu nombre"
                />
              </label>

              <div className="mt-5">
                <p className="text-sm font-semibold text-lago-navy dark:text-white">
                  Calificación
                </p>
                <div className="mt-3 flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      aria-label={`${star} estrellas`}
                      onClick={() => setRating(star)}
                      className="rounded-md p-1 text-amber-400 transition hover:scale-110 focus:outline-none focus:ring-4 focus:ring-amber-300/30"
                    >
                      {star <= rating ? <FaStar size={27} /> : <FaRegStar size={27} />}
                    </button>
                  ))}
                </div>
              </div>

              <label className="mt-5 block text-sm font-semibold text-lago-navy dark:text-white">
                Comentario
                <textarea
                  className="input-field mt-2 min-h-32 resize-y"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                  placeholder="Comparte tu experiencia."
                />
              </label>

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
                {isSubmitting ? "Enviando..." : "Enviar Reseña"}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Stars({ value, className = "" }: { value: number; className?: string }) {
  return (
    <div className={`flex gap-1 text-amber-400 ${className}`}>
      {[1, 2, 3, 4, 5].map((star) =>
        star <= value ? <FaStar key={star} /> : <FaRegStar key={star} />
      )}
    </div>
  );
}

function ReviewEmpty({ text }: { text: string }) {
  return (
    <div className="md:col-span-2 rounded-lg border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-500 dark:border-white/20 dark:bg-white/[0.05] dark:text-white/60">
      {text}
    </div>
  );
}
