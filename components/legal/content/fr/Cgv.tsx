import { DocHeader, List, Section, Subheading, TodoNote } from "../../_shared";

export const CGV_META = {
  title: "Conditions Générales de Vente",
  version: "1.0",
  effectiveDate: "[Date de lancement de l'offre venues]",
};

export default function Cgv() {
  return (
    <article className="space-y-8">
      <DocHeader {...CGV_META} />

      <p className="text-muted">
        Offre d&apos;abonnement à destination des salles et lieux de concerts.
      </p>

      <TodoNote>
        Les zones entre [crochets] sont à compléter avant toute publication. Les
        tarifs indiqués sont des exemples à valider.
      </TodoNote>

      <div className="space-y-6 text-muted">
        <Section title="Préambule">
          <p>
            Les présentes Conditions Générales de Vente (CGV) régissent les
            relations contractuelles entre Laboon, ci-après « le Prestataire », et
            toute salle de concert, café-concert, studio, bar musical ou lieu de
            spectacle vivant, ci-après « le Client », souhaitant accéder aux
            services payants de la plateforme Laboon.
          </p>
          <p>
            Laboon propose aux lieux musicaux un service de mise en relation avec
            des musiciens inscrits sur la plateforme, ainsi que des outils de
            diffusion d&apos;annonces et de gestion des candidatures.
          </p>
          <p>
            Toute souscription à un abonnement Laboon vaut acceptation sans réserve
            des présentes CGV.
          </p>
        </Section>

        <Section title="1. Définitions">
          <List>
            <li>
              <strong>« Laboon » ou « le Prestataire »</strong> : [Nom /
              dénomination sociale], co-fondateurs de Laboon, exploitants de la
              plateforme.
            </li>
            <li>
              <strong>« Client »</strong> : toute personne morale ou physique
              représentant un lieu musical (salle, bar, studio, association…) ayant
              souscrit à un abonnement payant Laboon.
            </li>
            <li>
              <strong>« Abonnement »</strong> : la formule d&apos;accès aux Services
              payants de Laboon, souscrite pour une durée déterminée.
            </li>
            <li>
              <strong>« Services »</strong> : l&apos;ensemble des fonctionnalités
              payantes accessibles au Client via son espace dédié (publication
              d&apos;annonces, accès aux profils musiciens, messagerie, tableau de
              bord, etc.).
            </li>
            <li>
              <strong>« Annonce »</strong> : offre de prestation publiée par le
              Client à destination des musiciens inscrits (concert, résidence,
              casting, session…).
            </li>
            <li>
              <strong>« Espace Client »</strong> : interface privée accessible au
              Client après création de son compte et souscription à un abonnement.
            </li>
          </List>
        </Section>

        <Section title="2. Offres et tarifs">
          <p>
            Laboon propose les formules d&apos;abonnement suivantes à destination
            des lieux musicaux :
          </p>

          <Subheading>Formule Découverte — Gratuite</Subheading>
          <List>
            <li>Création d&apos;une fiche lieu visible par les musiciens inscrits</li>
            <li>Accès en lecture aux profils musiciens</li>
            <li>1 annonce active simultanément</li>
            <li>Messagerie limitée (réponse aux candidatures entrantes uniquement)</li>
          </List>

          <Subheading>Formule Essentielle — [X] €/mois HT</Subheading>
          <List>
            <li>Fiche lieu complète avec médias (photos, liens réseaux sociaux, agenda)</li>
            <li>Annonces illimitées</li>
            <li>Messagerie active (prise de contact directe avec les musiciens)</li>
            <li>
              Accès aux filtres de recherche avancée (instrument, style,
              localisation, disponibilité)
            </li>
            <li>Support par email sous 48h ouvrées</li>
          </List>

          <Subheading>Formule Pro — [X] €/mois HT</Subheading>
          <List>
            <li>Tout le contenu de la formule Essentielle</li>
            <li>Mise en avant prioritaire de la fiche lieu dans les résultats</li>
            <li>Statistiques de consultation de vos annonces</li>
            <li>Badge « Lieu partenaire » visible sur votre fiche</li>
            <li>Support prioritaire sous 24h ouvrées</li>
            <li>Accès anticipé aux nouvelles fonctionnalités</li>
          </List>

          <p>
            Les tarifs sont indiqués hors taxes. La TVA applicable est celle en
            vigueur en France au moment de la facturation (actuellement 20%).
          </p>
          <p>
            Laboon se réserve le droit de modifier ses tarifs avec un préavis
            d&apos;au moins 30 jours avant la date de renouvellement de
            l&apos;abonnement.
          </p>
        </Section>

        <Section title="3. Souscription et durée">
          <Subheading>3.1 Souscription</Subheading>
          <p>
            La souscription à un abonnement payant s&apos;effectue directement
            depuis l&apos;Espace Client. Le Client doit disposer d&apos;un compte
            valide et fournir des informations de facturation exactes et à jour.
            L&apos;abonnement prend effet à la date de validation du paiement par
            notre prestataire de paiement.
          </p>
          <Subheading>3.2 Durée et renouvellement</Subheading>
          <p>
            Les abonnements sont souscrits pour une durée d&apos;un (1) mois,
            renouvelés automatiquement par tacite reconduction à la date
            anniversaire, sauf résiliation par le Client dans les conditions
            prévues à l&apos;article 7. Un abonnement annuel (12 mois) est également
            disponible avec une remise de [X]% par rapport au tarif mensuel.
          </p>
          <Subheading>3.3 Offre de lancement — Premiers partenaires</Subheading>
          <p>
            Dans le cadre du lancement de Laboon, les [X] premiers lieux
            partenaires bénéficient de 3 mois d&apos;accès gratuit à la formule
            Essentielle, sans engagement de durée. À l&apos;issue de cette période,
            l&apos;abonnement bascule automatiquement vers la formule Gratuite, sauf
            souscription explicite à une formule payante.
          </p>
        </Section>

        <Section title="4. Conditions de paiement">
          <Subheading>4.1 Modalités</Subheading>
          <p>
            Le règlement des abonnements s&apos;effectue par carte bancaire ou
            prélèvement SEPA via notre prestataire de paiement sécurisé [Stripe /
            autre — à compléter]. La facturation intervient à la date de
            souscription puis à chaque renouvellement mensuel ou annuel.
          </p>
          <Subheading>4.2 Factures</Subheading>
          <p>
            Une facture est automatiquement générée et mise à disposition dans
            l&apos;Espace Client à chaque échéance de paiement. Le Client peut
            télécharger ses factures à tout moment depuis son espace.
          </p>
          <Subheading>4.3 Défaut de paiement</Subheading>
          <p>
            En cas d&apos;échec du paiement, Laboon notifie le Client par email et
            tente un nouveau prélèvement sous 5 jours ouvrés. Passé ce délai, en
            l&apos;absence de régularisation, l&apos;accès aux Services payants est
            suspendu jusqu&apos;à la mise à jour des informations de paiement.
            Conformément à l&apos;article L.441-10 du Code de commerce, tout retard
            de paiement entraîne l&apos;application d&apos;une pénalité égale à 3 fois
            le taux d&apos;intérêt légal en vigueur, ainsi qu&apos;une indemnité
            forfaitaire de recouvrement de 40 €.
          </p>
        </Section>

        <Section title="5. Description des services">
          <Subheading>5.1 Accès à la plateforme</Subheading>
          <p>
            Laboon s&apos;engage à mettre à disposition du Client un accès à la
            plateforme conforme à la formule souscrite. L&apos;accès est personnel,
            non cessible et non transférable.
          </p>
          <Subheading>5.2 Publication d&apos;annonces</Subheading>
          <p>
            Le Client peut publier des annonces à destination des musiciens
            inscrits. Chaque annonce doit décrire de façon précise et honnête la
            prestation proposée (type de date, rémunération ou conditions, style
            musical recherché, lieu, date). Laboon se réserve le droit de modérer ou
            de retirer toute annonce ne respectant pas ces exigences ou contraire
            aux CGU de la plateforme.
          </p>
          <Subheading>5.3 Mise en relation</Subheading>
          <p>
            Laboon fournit les outils techniques permettant la mise en relation
            entre le Client et les musiciens. Laboon n&apos;est pas partie aux
            accords conclus entre le Client et les musiciens et ne saurait être tenu
            responsable de l&apos;exécution de ces accords. La conclusion d&apos;un
            contrat (cachet, prestation, résidence…) relève de la seule
            responsabilité des deux parties concernées.
          </p>
          <Subheading>5.4 Disponibilité</Subheading>
          <p>
            Laboon s&apos;engage à maintenir la plateforme accessible 24h/24 et
            7j/7, hors périodes de maintenance planifiées annoncées à l&apos;avance.
            En cas d&apos;interruption non planifiée dépassant 24h consécutives, le
            Client peut demander un avoir prorata temporis sur son abonnement en
            cours.
          </p>
        </Section>

        <Section title="6. Obligations du Client">
          <p>Le Client s&apos;engage à :</p>
          <List>
            <li>
              Fournir des informations exactes lors de la création de son compte et
              les maintenir à jour
            </li>
            <li>
              Utiliser les Services conformément aux présentes CGV et à la
              législation applicable
            </li>
            <li>Ne publier que des annonces correspondant à des projets musicaux réels</li>
            <li>
              Respecter les musiciens inscrits dans toutes ses communications via la
              plateforme
            </li>
            <li>
              Ne pas tenter de contourner la plateforme pour recruter un musicien
              contacté via Laboon en dehors du cadre de l&apos;abonnement, pendant la
              durée de celui-ci
            </li>
            <li>Maintenir la confidentialité de ses identifiants de connexion</li>
          </List>
        </Section>

        <Section title="7. Résiliation">
          <Subheading>7.1 Résiliation par le Client</Subheading>
          <p>
            Le Client peut résilier son abonnement mensuel à tout moment depuis son
            Espace Client, avec effet à la prochaine date de renouvellement. Aucun
            remboursement n&apos;est effectué pour la période en cours. Pour un
            abonnement annuel, la résiliation prend effet à l&apos;échéance annuelle
            en cours ; aucun remboursement n&apos;est accordé pour les mois
            restants.
          </p>
          <Subheading>7.2 Résiliation par Laboon</Subheading>
          <p>Laboon peut résilier l&apos;abonnement d&apos;un Client sans préavis en cas de :</p>
          <List>
            <li>Violation grave ou répétée des présentes CGV</li>
            <li>Utilisation frauduleuse de la plateforme</li>
            <li>Publication d&apos;annonces mensongères ou préjudiciables aux musiciens</li>
            <li>Défaut de paiement non régularisé dans un délai de 15 jours</li>
          </List>
          <p>
            En cas de résiliation pour motif légitime par Laboon, un remboursement
            prorata temporis de la période non consommée est effectué, sauf en cas
            de faute grave du Client.
          </p>
          <Subheading>7.3 Conséquences de la résiliation</Subheading>
          <p>
            À compter de la date effective de résiliation, le Client perd
            l&apos;accès aux fonctionnalités payantes. Ses annonces actives sont
            automatiquement désactivées. Les données du compte sont conservées
            conformément à la Politique de Confidentialité de Laboon.
          </p>
        </Section>

        <Section title="8. Droit de rétractation">
          <p>
            Conformément à l&apos;article L.221-18 du Code de la consommation, le
            Client professionnel ne bénéficie pas du droit de rétractation de 14
            jours applicable aux consommateurs particuliers. Toutefois, dans le
            cadre de sa politique commerciale de lancement, Laboon accorde à tout
            nouveau Client professionnel une période d&apos;essai de [X] jours sans
            engagement, durant laquelle il peut résilier sans frais via son Espace
            Client.
          </p>
        </Section>

        <Section title="9. Responsabilité">
          <Subheading>9.1 Responsabilité de Laboon</Subheading>
          <p>
            Laboon est tenu à une obligation de moyens dans la fourniture des
            Services. Sa responsabilité ne peut être engagée en cas de :
          </p>
          <List>
            <li>
              Interruption de service due à un cas de force majeure ou à une
              défaillance technique de l&apos;hébergeur
            </li>
            <li>Contenu publié par un musicien sur son profil (Laboon agit en qualité d&apos;hébergeur)</li>
            <li>Inexécution d&apos;un accord conclu entre un Client et un musicien via la plateforme</li>
            <li>Perte de données résultant d&apos;une utilisation inappropriée de la plateforme par le Client</li>
          </List>
          <p>
            En tout état de cause, la responsabilité de Laboon est limitée au
            montant des sommes effectivement versées par le Client au titre de
            l&apos;abonnement au cours des 3 derniers mois précédant le sinistre.
          </p>
          <Subheading>9.2 Responsabilité du Client</Subheading>
          <p>
            Le Client est seul responsable des annonces publiées, des engagements
            pris envers les musiciens et de l&apos;utilisation qu&apos;il fait des
            Services dans le cadre de son activité.
          </p>
        </Section>

        <Section title="10. Propriété intellectuelle">
          <p>
            L&apos;ensemble des éléments de la plateforme Laboon (interface, logo,
            textes, fonctionnalités) est la propriété exclusive de Laboon et protégé
            par les lois sur la propriété intellectuelle. Le Client ne peut
            reproduire, modifier ou exploiter ces éléments sans autorisation écrite
            préalable de Laboon.
          </p>
          <p>
            Le Client autorise Laboon à mentionner son établissement comme « lieu
            partenaire » sur la plateforme et dans ses communications marketing,
            sauf demande expresse contraire.
          </p>
        </Section>

        <Section title="11. Données personnelles">
          <p>
            Le traitement des données personnelles du Client et de ses contacts est
            régi par la Politique de Confidentialité de Laboon, disponible sur la
            plateforme. Laboon agit en qualité de responsable de traitement pour les
            données du compte Client, et en qualité de sous-traitant pour les
            données que le Client traite via la plateforme dans le cadre de ses
            propres activités.
          </p>
        </Section>

        <Section title="12. Modification des CGV">
          <p>
            Laboon se réserve le droit de modifier les présentes CGV à tout moment.
            Le Client est informé de toute modification par email au moins 30 jours
            avant l&apos;entrée en vigueur des nouvelles conditions. S&apos;il ne les
            accepte pas, il peut résilier son abonnement avant cette date sans
            pénalité et avec remboursement prorata temporis. La poursuite de
            l&apos;utilisation des Services après la date d&apos;entrée en vigueur
            vaut acceptation des nouvelles CGV.
          </p>
        </Section>

        <Section title="13. Droit applicable et règlement des litiges">
          <p>Les présentes CGV sont soumises au droit français.</p>
          <p>
            En cas de litige, les parties s&apos;engagent à rechercher une solution
            amiable dans un délai de 30 jours à compter de la notification écrite du
            litige. À défaut, le litige sera soumis au Tribunal de Commerce de Lyon,
            seul compétent, y compris en cas de pluralité de défendeurs ou
            d&apos;appel en garantie.
          </p>
        </Section>

        <Section title="14. Contact et service client">
          <p>
            Pour toute question relative aux présentes CGV, à votre abonnement ou à
            la facturation :{" "}
            <a className="text-brand hover:underline" href="mailto:contact@laboon.fr">
              contact@laboon.fr
            </a>
          </p>
          <p>
            Délai de réponse : 48h ouvrées (formule Essentielle) / 24h ouvrées
            (formule Pro).
          </p>
        </Section>
      </div>
    </article>
  );
}
