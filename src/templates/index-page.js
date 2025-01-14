import React from "react";
import PropTypes from "prop-types";
import { getImage } from "gatsby-plugin-image";
import { graphql } from 'gatsby'
import Layout from "../components/Layout";
import Features from "../components/Features";
import ProjectsRoll from "../components/ProjectsRoll";
import FullWidthImage from "../components/FullWidthImage";

import "bootstrap/dist/css/bootstrap.min.css";
import ProjectsFeaturedRoll from "../components/ProjectsFeaturedRoll";

// eslint-disable-next-line
export const IndexPageTemplate = ({
                                      image,
                                      title,
                                      heading,
                                      subheading,
                                      mainpitch,
                                      description,
                                      intro,
                                  }) => {
    const heroImage = getImage(image) || image;

    return (
        <div>
            <FullWidthImage img={heroImage} title={title} subheading={subheading} />
            <section className="section section--gradient">
                <div className="container">
                    <div className="section">
                        <div className="columns">
                            <div className="column is-10 is-offset-1">
                                <div className="content">
                                    <div className="content">
                                        <div className="tile">
                                            <h1 className="title">{mainpitch.title}</h1>
                                        </div>
                                        <div className="tile">
                                            <h3 className="subtitle">{mainpitch.description}</h3>
                                        </div>
                                    </div>
                                    <h3 className="has-text-weight-semibold is-size-2 has-text-centered">
                                        Serveis
                                    </h3>
                                    <Features gridItems={intro.blurbs} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container">
                <div className="column is-12 ">
                    <h3 className="has-text-weight-semibold is-size-2 has-text-centered">
                        Projectes Destacats
                    </h3>
                </div>
                <div className="projects-list">
                    <ProjectsFeaturedRoll />
                </div>
            </section>
        </div>
    );
};

IndexPageTemplate.propTypes = {
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    title: PropTypes.string,
    heading: PropTypes.string,
    subheading: PropTypes.string,
    mainpitch: PropTypes.object,
    description: PropTypes.string,
    intro: PropTypes.shape({
        blurbs: PropTypes.array,
    }),
};

const IndexPage = ({ data }) => {
    const { frontmatter } = data.markdownRemark;

    return (
        <Layout>
            <IndexPageTemplate
                image={frontmatter.image}
                title={frontmatter.title}
                heading={frontmatter.heading}
                subheading={frontmatter.subheading}
                mainpitch={frontmatter.mainpitch}
                description={frontmatter.description}
                intro={frontmatter.intro}
            />
        </Layout>
    );
};

IndexPage.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.shape({
            frontmatter: PropTypes.object,
        }),
    }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: FULL_WIDTH)
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        intro {
          blurbs {
            image {
              childImageSharp {
                gatsbyImageData(width: 600, quality: 64, layout: CONSTRAINED)
              }
            }
            slug
            text
          }
          heading
          description
        }
      }
    }
  }
`;
