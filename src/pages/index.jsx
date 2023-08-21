import * as React from "react"
import { graphql, Link } from "gatsby"
import { Layout } from "../components/layout"
import { ProductListing } from "../components/product-listing"
import { Seo } from "../components/seo"
import { container } from "./index.module.css"
// import { HeroVideo } from "../constants/images"
import App from "../components/App"
import "../styles.css"
import Overlay from "../components/Overlay"

export const query = graphql`
  query {
    shopifyCollection(handle: { eq: "frontpage" }) {
      products {
        ...ProductCard
      }
    }
  }
`

function Hero() {
  return (
    <section className="home-hero">
      <div className={container}>
        <div className="hero-main">
          {/*<div>*/}
          {/*  <h1 className="hero__title">Til ditt bassengprosjekt</h1>*/}
          {/*  <p className="hero__body">*/}
          {/*    Stilrene løsninger for utstyret til ditt basseng. Finn gode produkter, til god pris og rask levering her!*/}
          {/*  </p>*/}
          {/*  <Link to="/products" className="btn-cta">*/}
          {/*    Se sortiment*/}
          {/*  </Link>*/}
          {/*</div>*/}
          {/*/!*<div className="sketchfab-embed-wrapper">*!/*/}
          {/*/!*</div>*!/*/}

          <div className="hero_title_big">
      <span className="heading__outer">
        <span className="heading__inner">Til ditt</span>
        <span className="heading__frakt">Frakt kun 49kr!</span>
      </span>
            <span className="heading__outer">
        <span className="heading__inner">basseng</span>
      </span>
            <span className="heading__outer">
        <span className="heading__inner">prosjekt</span>
      </span>
          </div>
          <div className="hero_subtitle_small">
            3D modell av komplett bassenganlegg på Østlandet
          </div>


        </div>
      </div>

      <div className="hero-video__bg">
        {/*<div className="overlay">&nbsp;</div>*/}
        <App />
        <Overlay />
        {/*<video autoPlay loop muted playsInline controlsList="nodownload">*/}
        {/*  <track kind="captions" srcLang="en" label="english_captions" />*/}
        {/*  <source src={HeroVideo} type="video/mp4" />*/}
        {/*  Your browser does not support the video tag.*/}
        {/*</video>*/}
      </div>
      <style jsx global>{`
        .home-hero {
          position: relative;
        }

        .hero-main {
          margin: 0 auto;
          min-height: calc(100vh - 20rem);
          max-width: 128rem;
          padding: 0;
          position: relative;
          top: 80px;
          display: flex;
          width: 100%;
          z-index: 4;
          pointer-events: none;
        }

        canvas {
          cursor: grab;
          cursor: -moz-grab;
          cursor: -webkit-grab;
        }

        canvas:active {
          cursor: grabbing;
          cursor: -moz-grabbing;
          cursor: -webkit-grabbing;
        }

        //.hero__title {
        //  color: #fff;
        //  font-family: ClearSansBold;
        //  font-size: 72px;
        //  font-weight: 700;
        //  line-height: 80px;
        //  margin-bottom: 24px;
        //}
        //.hero__body {
        //  font-size: 24px;
        //  line-height: 32px;
        //  color: var(--text-color-platinum);
        //  max-width: 700px;
        //  margin-bottom: 24px;
        //}
        //.btn-cta {
        //  border-radius: 0.3rem;
        //  cursor: pointer;
        //  display: inline-block;
        //  font-weight: 500;
        //  text-align: center;
        //  white-space: nowrap;
        //  background-color: var(--pool);
        //  border: none;
        //  color: var(--text-color-inverted);
        //  padding: 1.2rem 3.4rem;
        //  font-size: 17px;
        //  font-family: ClearSansBold;
        //}
        //.btn-cta:hover {
        //  background-color: #23c3ff;
        //}
        .hero-video__bg {
          border-radius: 0;
          position: absolute;
          top: 0;
          overflow: hidden;
          width: 100%;
          height: 100%;
          z-index: 3;
        }

        .hero-video__bg .overlay {
          position: absolute;
          height: 100%;
          width: 100%;
          background: linear-gradient(0deg,
          hsla(0, 0%, 0%, 0),
          hsla(210, 11%, 11%, 1) 0%,
          hsla(0, 0%, 0%, 0));
        }

        .hero-video__bg video {
          display: block;
          height: 100%;
          -o-object-fit: cover;
          object-fit: cover;
          width: 100%;
        }

        .sketchfab-embed-wrapper {
          width: 100vw;
          height: 580px;
        }

        //@media (max-width: 1024px) {
        //  .hero-main {
        //    margin-top: 100px;
        //    flex-wrap: wrap;
        //  }

          .sketchfab-embed-wrapper {
            margin: 0 auto;
            width: 370px;
            height: 290px;
            margin-bottom: 40px;
          }

          .sketchfab-embed-wrapper iframe {
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .hero__title {
            font-size: 48px;
            line-height: auto;
          }

          .hero__body {
            font-size: 20px;
            line-height: 24px;
          }
        }

        @media (max-width: 600px) {
          .hero__title {
            font-size: 32px;
            line-height: 32px;
          }
        }
      `}</style>
    </section>
  )
}

export default function IndexPage({ data }) {
  return (
    <Layout>
      <Hero />
      <ProductListing products={data?.shopifyCollection?.products} />
    </Layout>
  )
}

export const Head = () => <Seo />
