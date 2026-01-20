import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

type Language = "es" | "en" | "pt";
type Length = "short" | "long";

interface TemplateContent {
  short: string;
  long: string;
}

interface Template {
  title: string;
  tags: { label: string; variant: "info" | "success" }[];
  content: Record<Language, TemplateContent>;
  whenToUse: string[];
  relatedTemplates: { label: string; to: string }[];
}

const sampleTemplate: Template = {
  title: "Contingent Worker Hire",
  tags: [
    { label: "EC-SF", variant: "info" },
    { label: "New Hire", variant: "success" },
  ],
  content: {
    es: {
      short: `Buenos días/Buenas tardes [Nombre del Manager/HRBP],

Gracias por contactarte con People Services.

✅ Contingent Worker Creado Exitosamente:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Confirmamos que el perfil del contingent worker ha sido creado 
satisfactoriamente en EC-SF:

📋 Información del Contingent Worker:
- Información general: [Nombre completo del trabajador, posición, manager]
- Estado: ✅ Creado - Pendiente aprobación de workflow

🔄 Próximo paso importante:

El manager [Nombre del manager] recibirá un workflow de aprobación
en EC-SF en las próximas 2-4 horas.

Una vez aprobado el workflow:
✓ El perfil será completamente visible en EC-SF
✓ El 4-2-2 estará disponible en el perfil del trabajador

Saludos cordiales,

[Specialist's Name]
People Services

---
📌 Caso: [Número de Ticket] | Contingent Worker: [Nombre] | Pendiente: Aprobación workflow`,
      long: `Buenos días/Buenas tardes [Nombre del Manager/HRBP],

Gracias por contactarte con People Services.

✅ Contingent Worker Creado Exitosamente:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Confirmamos que el perfil del contingent worker ha sido creado 
satisfactoriamente en EC-SF:

📋 Información del Contingent Worker:
- Información general: [Nombre completo del trabajador, posición, manager]
- Estado: ✅ Creado - Pendiente aprobación de workflow

🔄 Próximo paso importante:

El manager [Nombre del manager] recibirá un workflow de aprobación
en EC-SF en las próximas 2-4 horas.

Una vez aprobado el workflow:
✓ El perfil será completamente visible en EC-SF
✓ El 4-2-2 estará disponible en el perfil del trabajador
✓ El correo corporativo será: [nombre.apellido]@bbraun.com (si aplica)
✓ Los accesos estarán activos para la fecha de inicio

⏰ **Timeline:**
- Workflow enviado: Próximas 2-4 horas
- Aprobación requerida: Antes de [fecha]
- Perfil visible: Inmediatamente después de aprobación
- Accesos activos: [Fecha de inicio]

Saludos cordiales,

[Specialist's Name]
People Services

---
📌 Caso: [Número de Ticket] | Contingent Worker: [Nombre] | Pendiente: Aprobación workflow`,
    },
    en: {
      short: `Good morning/Good afternoon [Manager’s/HRBP’s Name],

Thank you for contacting People Services.

✅ Contingent Worker Successfully Created:  
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

We confirm that the contingent worker’s profile has been successfully created in EC-SF:

📋 Contingent Worker Information:

General information: [Full name of worker, position, manager]

Status: ✅ Created – Pending workflow approval

🔄 Next important step:

The manager [Manager’s Name] will receive a workflow approval request in EC-SF within the next 2–4 hours.

Once the workflow is approved:
✓ The profile will be fully visible in EC-SF
✓ The 4-2-2 will be available in the worker’s profile

Best regards,
[Specialist’s Name]
People Services

📌 Case: [Ticket Number] | Contingent Worker: [Name] | Pending: Workflow approval
`,
      long: `Good morning/Good afternoon [Manager’s/HRBP’s Name],

Thank you for contacting People Services.

✅ Contingent Worker Successfully Created:  
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

We confirm that the contingent worker’s profile has been successfully created in EC-SF:

📋 Contingent Worker Information:

-General information: [Full name of worker, position, manager]
-Status: ✅ Created – Pending workflow approval

🔄 Next important step:

The manager [Manager’s Name] will receive a workflow approval request in EC-SF within the next 2–4 hours.

Once the workflow is approved:
✓ The profile will be fully visible in EC-SF
✓ The 4-2-2 will be available in the worker’s profile
✓ The corporate email will be: [firstname.lastname]@bbraun.com (if applicable)
✓ Access will be active as of the start date

⏰ Timeline:

-Workflow sent: Within the next 2–4 hours
-Approval required: Before [date]
-Profile visible: Immediately after approval
-Access active: [Start date]

Best regards,
[Specialist’s Name]
People Services

------------------------
📌 Case: [Ticket Number] | Contingent Worker: [Name] | Pending: Workflow approval`,
    },
    pt: {
      short: `Bom dia/Boa tarde [Nome do Manager/HRBP],

Obrigado por entrar em contato com People Services.

✅ Contingent Worker Criado com Sucesso:  
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Confirmamos que o perfil do contingent worker foi criado com sucesso no EC-SF:

📋 Informações do Contingent Worker:

Informações gerais: [Nome completo do trabalhador, posição, manager]

Status: ✅ Criado – Pendente aprovação do workflow

🔄 Próximo passo importante:

O manager [Nome do manager] receberá uma solicitação de aprovação de workflow no EC-SF dentro das próximas 2–4 horas.

Uma vez aprovado o workflow:
✓ O perfil ficará totalmente visível no EC-SF
✓ O 4-2-2 estará disponível no perfil do trabalhador

Atenciosamente,
[Nome do Especialista]
People Services

📌 Caso: [Número do Ticket] | Contingent Worker: [Nome] | Pendente: Aprovação de workflow`,
      long: `Bom dia/Boa tarde [Nome do Manager/HRBP],

Obrigado por entrar em contato com People Services.

✅ Contingent Worker Criado com Sucesso:  
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Confirmamos que o perfil do contingent worker foi criado com sucesso no EC-SF:

📋 Informações do Contingent Worker:

-Informações gerais: [Nome completo do trabalhador, posição, manager]
-Status: ✅ Criado – Pendente aprovação do workflow

🔄 Próximo passo importante:

O manager [Nome do manager] receberá uma solicitação de aprovação de workflow no EC-SF dentro das próximas 2–4 horas.

Uma vez aprovado o workflow:
✓ O perfil ficará totalmente visível no EC-SF
✓ O 4-2-2 estará disponível no perfil do trabalhador
✓ O e-mail corporativo será: [nome.sobrenome]@bbraun.com (se aplicável)
✓ Os acessos estarão ativos a partir da data de início

⏰ Cronograma:

-Workflow enviado: Dentro das próximas 2–4 horas
-Aprovação necessária: Antes de [data]
-Perfil visível: Imediatamente após a aprovação
-Acessos ativos: [Data de início]

Atenciosamente,
[Nome do Especialista]
People Services

📌 Caso: [Número do Ticket] | Contingent Worker: [Nome] | Pendente: Aprovação de workflow`,
    },
  },
  whenToUse: [
    "After completing new hire setup in EC-SF",
    "When all systems are configured",
    "Before closing the JIRA ticket",
  ],
  relatedTemplates: [
    { label: "New Hire - Initial Comment", to: "/templates/new-hire-initial" },
    { label: "New Hire - Incomplete Information", to: "/templates/new-hire-incomplete" },
  ],
};

const languageLabels: Record<Language, { flag: string; label: string }> = {
  es: { flag: "🇪🇸", label: "Spanish" },
  en: { flag: "🇬🇧", label: "English" },
  pt: { flag: "🇧🇷", label: "Portuguese" },
};

const tagVariants = {
  info: "bg-info-light text-info",
  success: "bg-success-light text-success",
};

export function FeaturedTemplates() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("es");
  const [selectedLength, setSelectedLength] = useState<Length>("short");
  const [copiedLang, setCopiedLang] = useState<Language | null>(null);

  const handleCopy = async (lang: Language) => {
    const textToCopy = sampleTemplate.content[lang][selectedLength];
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedLang(lang);
      toast({
        title: "Copied!",
        description: `${languageLabels[lang].label} version copied to clipboard`,
      });
      setTimeout(() => setCopiedLang(null), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6 text-foreground border-b border-border pb-2">
        Featured Templates
      </h2>

      <div className="bg-card rounded-xl shadow-md overflow-hidden">
        <div className="p-5 md:p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-card-foreground">
                {sampleTemplate.title} - {languageLabels[selectedLanguage].label}
              </h3>
              <div className="flex flex-wrap gap-2">
                {sampleTemplate.tags.map((tag) => (
                  <span
                    key={tag.label}
                    className={cn("px-3 py-1 rounded-full text-sm font-medium", tagVariants[tag.variant])}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Language Selector */}
            <div className="flex gap-2">
              {(Object.keys(languageLabels) as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={cn(
                    "text-2xl p-2 rounded-lg transition-all hover:scale-110",
                    selectedLanguage === lang
                      ? "bg-accent ring-2 ring-primary"
                      : "hover:bg-muted"
                  )}
                  title={languageLabels[lang].label}
                >
                  {languageLabels[lang].flag}
                </button>
              ))}
            </div>
          </div>

          {/* Length Toggle */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-sm font-medium text-muted-foreground">Version:</span>
            <div className="flex bg-muted rounded-lg p-1">
              <button
                onClick={() => setSelectedLength("short")}
                className={cn(
                  "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                  selectedLength === "short"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Short
              </button>
              <button
                onClick={() => setSelectedLength("long")}
                className={cn(
                  "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
                  selectedLength === "long"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Long
              </button>
            </div>
          </div>

          {/* Template Content */}
          <div className="mb-6">
            <h4 className="font-medium text-muted-foreground mb-2">
              {languageLabels[selectedLanguage].label} Version ({selectedLength}):
            </h4>
            <div className="bg-muted p-4 rounded-lg border border-border max-h-80 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-foreground font-sans">
                {sampleTemplate.content[selectedLanguage][selectedLength]}
              </pre>
            </div>
          </div>

          {/* Copy Buttons */}
          <div className="flex flex-wrap gap-3 mb-6">
            {(Object.keys(languageLabels) as Language[]).map((lang) => {
              const isCopied = copiedLang === lang;
              const isSelected = selectedLanguage === lang;
              return (
                <button
                  key={lang}
                  onClick={() => handleCopy(lang)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors",
                    isSelected
                      ? "bg-info hover:bg-info/90 text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  )}
                >
                  {isCopied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  Copy {languageLabels[lang].label}
                </button>
              );
            })}
          </div>

          {/* Additional Info */}
          <div className="border-t border-border pt-4">
            <h4 className="font-medium text-muted-foreground mb-2">When to Use:</h4>
            <ul className="list-disc pl-5 text-muted-foreground mb-4 space-y-1">
              {sampleTemplate.whenToUse.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <h4 className="font-medium text-muted-foreground mb-2">Related Templates:</h4>
            <div className="flex flex-wrap gap-2">
              {sampleTemplate.relatedTemplates.map((template) => (
                <Link
                  key={template.to}
                  to={template.to}
                  className="text-info hover:underline"
                >
                  {template.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
