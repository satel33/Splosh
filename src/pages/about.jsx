import * as React from "react"
import { Layout } from "../components/layout"
import { heading, paragraph, container } from "./about.module.css"
import { Seo } from "../components/seo"
import background from "../images/pool-about-background.png"

export default function NotFoundPage() {
  return (
    <Layout>
      <div className={container} style={{ backgroundImage: `url(${background})`, backgroundRepeat:"no-repeat", backgroundSize:"cover"}}>
        <h1 className={heading}>
          OM OSS I
          <br />
          Splosh
        </h1>
        <p className={paragraph}>
          Splosh ble etablert 12.11.2020. Splosh startet i første omgang med å selge overskuddsmaterialer fra et privat bassengprosjekt, og etter mange års erfaring med svømmebasseng og tilhørende spesialprodukter, begynte vi etterhvert å tilby utstyr og rør til svømmebasseng i større skala. Det meste gikk i spesialimport av nisjeprodukter som det er vanskeligere å få tak i her i Norge (b.la. transparante PVC rør, rør i forskjellige farger m.m.).
          <br /><br />
          I løpet av kort tid utvidet sortimentet seg til å inkludere mer av ulike tekniske komponenter og annet tilpasset utstyr til svømmebasseng. Vi tilbyr i dag et utvalg av spesialprodukter som er vanskelig å få tak i andre steder i landet og faktisk også ellers i verden.
          <br /><br />
          Vi har et lite dedikert team som står klare til å gi deg veiledning i prosjekteringen av bassenget ditt. Vi setter vår ekspertise og kunnskap til tjeneste for å sikre at du får den beste opplevelsen og de nødvendige verktøyene og utstyret for å skape ditt drømmebasseng i hagen.
          <br /><br />
          Vi håper du ønsker å utforske sortiment i nettbutikken vår, der du vil finne mye av det du trenger for prosjektering, bygging og vedlikehold av svømmebasseng.
          <br /><br />
          Vi er stolte av veksten vi har hatt, og vi setter stor pris på alle kundene som har besøkt vår nettbutikk. Kundetilfredshet er vår høyeste prioritet, og det er deres støtte og tillit som gjør at vi kan drive nettbutikken og fortsette å levere kvalitetsprodukter og tjenester.
          <br /><br />
          Ta gjerne kontakt med oss dersom du skulle ha spørsmål.
          <br /><br />
          Vi ser frem til å ønske deg velkommen som kunde hos Splosh. Vi ser frem til å hjelpe deg med å realisere drømmen om ditt perfekte basseng!
          <br /><br />
        </p>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo />
