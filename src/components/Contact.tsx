import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Send,
  MapPin,
  MessageSquare,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: "dev.shreyansh369@gmail.com",
    href: "mailto:dev.shreyansh369@gmail.com",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@Shreyansh-Dev369",
    href: "https://github.com/Shreyansh-Dev369",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "shreyansh369",
    href: "https://linkedin.com/in/shreyansh369",
  },
];

// Validation schema
const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const Contact: React.FC = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("Contacts")
        .insert({
          name: result.data.name,
          email: result.data.email,
          message: result.data.message,
        });

      if (error) throw error;

      setIsSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon!",
      });

      setTimeout(() => setIsSuccess(false), 3000);
    } catch (err: any) {
      toast({
        title: "Error sending message",
        description: err.message || "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="absolute bottom-1/4 left-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl"
        >
          <div className="mb-16 text-center">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="mb-4 inline-block font-mono text-sm font-medium text-primary"
            >
              // GET_IN_TOUCH
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="section-title mb-4"
            >
              Get In Touch
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="mx-auto max-w-2xl text-muted-foreground"
            >
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology. Let's connect!
            </motion.p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <div className="skill-card">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">
                      Let's Talk
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Reach out through any platform
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {contactMethods.map((method, index) => {
                    const Icon = method.icon;
                    return (
                      <motion.a
                        key={method.label}
                        href={method.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="group flex items-center gap-4 rounded-xl border border-border/50 bg-background/50 p-4 transition-all hover:border-primary/30 hover:bg-primary/5"
                        whileHover={{ x: 5 }}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {method.label}
                          </p>
                          <p className="font-medium text-foreground">
                            {method.value}
                          </p>
                        </div>
                      </motion.a>
                    );
                  })}
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>India • Open to Remote</span>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <form
                onSubmit={handleSubmit}
                className="skill-card space-y-5"
                noValidate
              >
               {["name", "email", "message"].map((field) => {
  const isTextarea = field === "message";
  const value = formData[field as keyof typeof formData];

  return (
    <div key={field} className="relative group">
      <label
        htmlFor={field}
        className="mb-2 block text-sm font-medium text-foreground"
      >
        {field.charAt(0).toUpperCase() + field.slice(1)}
      </label>

      {isTextarea ? (
        <textarea
          id={field}
          rows={4}
          value={value}
          onChange={handleChange}
          placeholder={`Your ${field}...`}
          className={`w-full resize-none rounded-lg border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:outline-none focus:ring-2 ${
            errors[field]
              ? "border-destructive focus:ring-destructive/20"
              : "border-border focus:ring-primary/20"
          } ${
            value
              ? "caret-transparent placeholder-opacity-30"
              : "caret-primary placeholder-opacity-100"
          }`}
        />
      ) : (
        <input
          id={field}
          type={field === "email" ? "email" : "text"}
          value={value}
          onChange={handleChange}
          placeholder={`Your ${field}`}
          className={`w-full rounded-lg border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:outline-none focus:ring-2 ${
            errors[field]
              ? "border-destructive focus:ring-destructive/20"
              : "border-border focus:ring-primary/20"
          } ${
            value
              ? "caret-transparent placeholder-opacity-30"
              : "caret-primary placeholder-opacity-100"
          }`}
        />
      )}

      {errors[field] && (
        <p className="mt-1 text-sm text-destructive">{errors[field]}</p>
      )}
    </div>
  );
})}


                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full disabled:opacity-70"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                    </>
                  ) : isSuccess ? (
                    <>
                      <CheckCircle className="h-4 w-4" /> Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" /> Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
