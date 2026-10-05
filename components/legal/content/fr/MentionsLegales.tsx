import { DocHeader, List, Section, TodoNote } from "../../_shared";

export const MENTIONS_LEGALES_META = {
  title: "Mentions légales",
  version: "1.0",
  effectiveDate: "[Date de lancement]",
};

export default function MentionsLegales() {
  return (
    <article className="space-y-8">
      <DocHeader {...MENTIONS_LEGALES_META} />

      <p className="text-muted">
        Conformément aux articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004
        pour la Confiance dans l&apos;Économie Numérique (LCEN).
      </p>

      <TodoNote>
        Les zones entre [crochets] sont à compléter avant toute publication.
      </TodoNote>

      <div className="space-y-6 text-muted">
        <Section title="1. Éditeur de l'application">
          <p>L&apos;application mobile et le site web Laboon sont édités par :</p>
          <List>
            <li>
              <strong>Nom / Dénomination sociale</strong> : [Nom complet ou
              dénomination de la structure juridique]
            </li>
            <li>
              <strong>Forme juridique</strong> : [Entreprise individuelle / SASU /
              SAS / autre]
            </li>
            <li>
              <strong>Adresse</strong> : [Adresse complète du siège social — Lyon,
              France]
            </li>
            <li>
              <strong>SIRET</strong> : [Numéro SIRET une fois l&apos;entreprise
              immatriculée]
            </li>
            <li>
              <strong>Adresse e-mail</strong> :{" "}
              <a className="text-brand hover:underline" href="mailto:contact@laboon.fr">
                contact@laboon.fr
              </a>
            </li>
            <li>
              <strong>Co-fondateurs</strong> : [Prénom Nom] et Mathieu [Nom de
              famille]
            </li>
          </List>
        </Section>

        <Section title="2. Directeur de la publication">
          <p>[Prénom Nom] — co-fondateur(trice) de Laboon.</p>
        </Section>

        <Section title="3. Hébergement">
          <p>L&apos;application Laboon est hébergée par :</p>
          <List>
            <li>[Nom de l&apos;hébergeur — ex. Amazon Web Services / OVH / autre]</li>
            <li>[Adresse de l&apos;hébergeur]</li>
            <li>[Site web de l&apos;hébergeur]</li>
          </List>
        </Section>

        <Section title="4. Propriété intellectuelle">
          <p>
            L&apos;ensemble des éléments constituant l&apos;application Laboon (nom,
            logo, charte graphique, contenus, logiciels) est protégé par les lois
            françaises et internationales relatives à la propriété intellectuelle.
          </p>
          <p>
            La marque « Laboon » est déposée auprès de l&apos;INPI sous les classes
            Nice 9, 35 et 41. Toute reproduction ou utilisation sans autorisation
            préalable est interdite.
          </p>
        </Section>

        <Section title="5. Liens hypertextes">
          <p>
            Laboon ne peut être tenu responsable du contenu des sites tiers vers
            lesquels des liens pourraient pointer depuis l&apos;application ou le site
            web.
          </p>
        </Section>

        <Section title="6. Droit applicable">
          <p>
            Les présentes mentions légales sont soumises au droit français. En cas de
            litige, les tribunaux compétents sont ceux du ressort de Lyon.
          </p>
        </Section>
      </div>
    </article>
  );
}
