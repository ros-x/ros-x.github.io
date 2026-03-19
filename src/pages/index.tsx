import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/ros2-xmake/intro">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

const projects = [
  {
    title: 'colcon-xmake',
    description: 'colcon plugin adding xmake build/test support for ROS 2 packages.',
    link: 'https://github.com/ros-x/colcon-xmake',
  },
  {
    title: 'ament_xmake',
    description: 'ROS 2 ament rule package for xmake-based packages.',
    link: 'https://github.com/ros-x/ament_xmake',
  },
  {
    title: 'ros2_xmake_examples',
    description: 'Example packages and E2E integration tests.',
    link: 'https://github.com/ros-x/ros2_xmake_examples',
  },
  {
    title: 'colcon-fish',
    description: 'Fish shell completions for colcon.',
    link: 'https://github.com/ros-x/colcon-fish',
  },
];

function ProjectCard({title, description, link}: {title: string; description: string; link: string}) {
  return (
    <div className={clsx('col col--3')}>
      <div className="card margin-bottom--lg">
        <div className="card__header">
          <Heading as="h3">{title}</Heading>
        </div>
        <div className="card__body">
          <p>{description}</p>
        </div>
        <div className="card__footer">
          <Link className="button button--primary button--block" to={link}>
            View on GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <section className="margin-vert--lg">
          <div className="container">
            <div className="row">
              {projects.map((props, idx) => (
                <ProjectCard key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
