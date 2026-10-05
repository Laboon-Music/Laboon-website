import { DocHeader, List, Section, Subheading, TodoNote } from "../../_shared";

export const CONFIDENTIALITE_META = {
  title: "Politique de confidentialité",
  version: "1.0",
  effectiveDate: "[Date de lancement de l'application]",
};

export default function Confidentialite() {
  return (
    <article className="space-y-8">
      <DocHeader {...CONFIDENTIALITE_META} />

      <p className="text-muted">
        Conformément au Règlement (UE) 2016/679 (RGPD) et à la loi Informatique et
        Libertés modifiée.
      </p>

      <TodoNote>
        Les zones entre [crochets] sont à compléter avant toute publication.
      </TodoNote>

      <div className="space-y-6 text-muted">
        <Section title="1. Identité du responsable de traitement">
          <p>
            [Nom / dénomination sociale], co-fondateurs de Laboon, sont responsables
            conjoints du traitement des données personnelles collectées via
            l&apos;application.
          </p>
          <p>
            Contact DPO / responsable :{" "}
            <a className="text-brand hover:underline" href="mailto:laboon.app@gmail.com">
              laboon.app@gmail.com
            </a>
          </p>
        </Section>

        <Section title="2. Données collectées">
          <Subheading>Lors de l&apos;inscription :</Subheading>
          <List>
            <li>Prénom et nom</li>
            <li>Adresse e-mail</li>
            <li>Mot de passe (stocké sous forme chiffrée, jamais en clair)</li>
            <li>Ville / localisation (pour les recherches de musiciens à proximité)</li>
          </List>
          <Subheading>Données de profil musical (renseignées volontairement) :</Subheading>
          <List>
            <li>Instrument(s) pratiqué(s)</li>
            <li>Style(s) musical/aux</li>
            <li>Niveau et disponibilité</li>
            <li>Biographie / description libre</li>
            <li>Photo de profil (optionnel)</li>
            <li>Liens vers des contenus audio/vidéo (SoundCloud, YouTube, etc.)</li>
          </List>
          <Subheading>Données techniques :</Subheading>
          <List>
            <li>Adresse IP</li>
            <li>Données de navigation et d&apos;utilisation de l&apos;application</li>
            <li>Type d&apos;appareil et système d&apos;exploitation</li>
          </List>
        </Section>

        <Section title="3. Finalités et bases légales du traitement">
          <List>
            <li>Création et gestion de votre compte — Base légale : exécution du contrat</li>
            <li>Mise en relation entre musiciens — Base légale : exécution du contrat</li>
            <li>Amélioration de l&apos;application (analytics) — Base légale : intérêt légitime</li>
            <li>Emails transactionnels liés au service — Base légale : exécution du contrat</li>
            <li>Emails marketing / newsletter — Base légale : consentement</li>
          </List>
        </Section>

        <Section title="4. Durée de conservation">
          <List>
            <li>Données de compte : toute la durée d&apos;activité du compte, puis 3 ans après la dernière connexion</li>
            <li>Données de contact (waitlist) : jusqu&apos;au lancement de l&apos;app, puis 1 an</li>
            <li>Données techniques (logs) : 12 mois</li>
          </List>
        </Section>

        <Section title="5. Destinataires des données">
          <p>
            Vos données personnelles ne sont pas vendues à des tiers. Elles peuvent
            être partagées avec :
          </p>
          <List>
            <li>Nos sous-traitants techniques (hébergeur, service d&apos;emailing, protection anti-robots des formulaires du site — Cloudflare Turnstile) dans le cadre de contrats conformes au RGPD</li>
            <li>Les autorités compétentes en cas d&apos;obligation légale</li>
          </List>
          <p>
            Tout transfert hors Union européenne fait l&apos;objet de garanties
            appropriées (clauses contractuelles types de la Commission européenne).
          </p>
        </Section>

        <Section title="6. Vos droits">
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <List>
            <li>Droit d&apos;accès : obtenir une copie de vos données</li>
            <li>Droit de rectification : corriger des données inexactes</li>
            <li>Droit à l&apos;effacement (« droit à l&apos;oubli »)</li>
            <li>Droit à la limitation du traitement</li>
            <li>Droit à la portabilité de vos données</li>
            <li>Droit d&apos;opposition au traitement</li>
            <li>Droit de retirer votre consentement à tout moment</li>
          </List>
          <p>
            Pour exercer ces droits :{" "}
            <a className="text-brand hover:underline" href="mailto:contact@laboon.fr">
              contact@laboon.fr
            </a>
            . Vous pouvez également introduire une réclamation auprès de la CNIL
            (www.cnil.fr).
          </p>
        </Section>

        <Section title="7. Cookies et traceurs">
          <p>
            L&apos;application mobile Laboon n&apos;utilise pas de cookies. Notre site
            web mesure son audience avec Vercel Web Analytics, un outil qui ne
            dépose aucun cookie et ne collecte que des statistiques anonymes et
            agrégées (pages vues, site de provenance, pays, type d&apos;appareil). Il
            ne permet pas de vous identifier et ne nécessite donc pas de
            consentement.
          </p>
        </Section>

        <Section title="8. Sécurité">
          <p>
            Laboon met en œuvre des mesures techniques et organisationnelles
            appropriées pour protéger vos données (chiffrement, accès restreint,
            protocoles HTTPS).
          </p>
        </Section>

        <Section title="9. Modification de la politique">
          <p>
            Laboon se réserve le droit de modifier la présente politique à tout
            moment. Toute modification substantielle vous sera notifiée par email ou
            via une notification dans l&apos;application.
          </p>
        </Section>
      </div>
    </article>
  );
}
