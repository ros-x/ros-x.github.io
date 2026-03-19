import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Translate, {translate} from '@docusaurus/Translate';

import styles from './index.module.css';

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          <Translate id="homepage.hero.title">
            Build ROS 2 packages with xmake
          </Translate>
        </Heading>
        <p className="hero__subtitle">
          <Translate id="homepage.hero.subtitle">
            Replace CMakeLists.txt with clean, readable xmake.lua — full ament integration, rosidl support, and CMake interoperability.
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/ros2-xmake/intro">
            <Translate id="homepage.hero.getStarted">
              Get Started
            </Translate>
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            href="https://github.com/ros-x"
            style={{marginLeft: '1rem'}}>
            <Translate id="homepage.hero.viewGithub">
              View on GitHub
            </Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

const features = [
  {
    titleId: 'homepage.feature.plugAndPlay.title',
    titleDefault: 'Plug-and-Play Build',
    descriptionId: 'homepage.feature.plugAndPlay.description',
    descriptionDefault:
      'add_rules("ament_xmake.package") replaces CMakeLists.txt. One rule handles package metadata, ament index, and CMake Config export.',
  },
  {
    titleId: 'homepage.feature.autoDeps.title',
    titleDefault: 'Automatic Dependency Resolution',
    descriptionId: 'homepage.feature.autoDeps.description',
    descriptionDefault:
      'add_ros_deps("rclcpp") recursively resolves include directories, compile definitions, and link flags from the ament index.',
  },
  {
    titleId: 'homepage.feature.rosidl.title',
    titleDefault: 'Full rosidl Support',
    descriptionId: 'homepage.feature.rosidl.description',
    descriptionDefault:
      'Define .msg, .srv, and .action files — the pipeline generates C/C++ code, typesupport libraries, and CMake exports automatically.',
  },
];

function FeatureCard({
  titleId,
  titleDefault,
  descriptionId,
  descriptionDefault,
}: {
  titleId: string;
  titleDefault: string;
  descriptionId: string;
  descriptionDefault: string;
}) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <Heading as="h3">
          <Translate id={titleId}>{titleDefault}</Translate>
        </Heading>
        <p>
          <Translate id={descriptionId}>{descriptionDefault}</Translate>
        </p>
      </div>
    </div>
  );
}

const projects = [
  {
    title: 'colcon-xmake',
    descriptionId: 'homepage.project.colconXmake',
    descriptionDefault: 'colcon plugin adding xmake build/test support for ROS 2 packages.',
    link: 'https://github.com/ros-x/colcon-xmake',
  },
  {
    title: 'ament_xmake',
    descriptionId: 'homepage.project.amentXmake',
    descriptionDefault: 'ROS 2 ament rule package for xmake-based packages.',
    link: 'https://github.com/ros-x/ament_xmake',
  },
  {
    title: 'ros2_xmake_examples',
    descriptionId: 'homepage.project.examples',
    descriptionDefault: 'Example packages and E2E integration tests.',
    link: 'https://github.com/ros-x/ros2_xmake_examples',
  },
  {
    title: 'colcon-fish',
    descriptionId: 'homepage.project.colconFish',
    descriptionDefault: 'Fish shell completions for colcon.',
    link: 'https://github.com/ros-x/colcon-fish',
  },
];

function ProjectCard({
  title,
  descriptionId,
  descriptionDefault,
  link,
}: {
  title: string;
  descriptionId: string;
  descriptionDefault: string;
  link: string;
}) {
  return (
    <div className={clsx('col col--3')}>
      <div className="card margin-bottom--lg">
        <div className="card__header">
          <Heading as="h3">{title}</Heading>
        </div>
        <div className="card__body">
          <p>
            <Translate id={descriptionId}>{descriptionDefault}</Translate>
          </p>
        </div>
        <div className="card__footer">
          <Link className="button button--primary button--block" to={link}>
            <Translate id="homepage.project.viewOnGithub">
              View on GitHub
            </Translate>
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
        {/* Feature Highlights */}
        <section className={styles.features}>
          <div className="container">
            <div className="row">
              {features.map((props, idx) => (
                <FeatureCard key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>

        {/* Project Cards */}
        <section className="margin-vert--lg">
          <div className="container">
            <Heading as="h2" className="text--center margin-bottom--lg">
              <Translate id="homepage.projects.title">
                Projects
              </Translate>
            </Heading>
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
