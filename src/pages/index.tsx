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
            使用 xmake 构建 ROS 2 软件包
          </Translate>
        </Heading>
        <p className="hero__subtitle">
          <Translate id="homepage.hero.subtitle">
            用简洁、可读的 xmake.lua 替代 CMakeLists.txt — 完整的 ament 集成、rosidl 支持和 CMake 互操作。
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/ros2-xmake/intro">
            <Translate id="homepage.hero.getStarted">
              快速开始
            </Translate>
          </Link>
          <Link
            className="button button--outline button--secondary button--lg"
            href="https://github.com/ros-x"
            style={{marginLeft: '1rem'}}>
            <Translate id="homepage.hero.viewGithub">
              在 GitHub 上查看
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
    titleDefault: '即插即用构建',
    descriptionId: 'homepage.feature.plugAndPlay.description',
    descriptionDefault:
      'add_rules("ament_xmake.package") 替代 CMakeLists.txt。一条规则处理包元数据、ament 索引和 CMake Config 导出。',
  },
  {
    titleId: 'homepage.feature.autoDeps.title',
    titleDefault: '自动依赖解析',
    descriptionId: 'homepage.feature.autoDeps.description',
    descriptionDefault:
      'add_ros_deps("rclcpp") 递归解析 include 目录、编译定义和链接标志。',
  },
  {
    titleId: 'homepage.feature.rosidl.title',
    titleDefault: '完整 rosidl 支持',
    descriptionId: 'homepage.feature.rosidl.description',
    descriptionDefault:
      '定义 .msg、.srv 和 .action 文件 — 流水线自动生成 C/C++ 代码、typesupport 库和 CMake 导出。',
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
    descriptionDefault: '为 ROS 2 软件包添加 xmake 构建/测试支持的 colcon 插件。',
    link: 'https://github.com/ros-x/colcon-xmake',
  },
  {
    title: 'ament_xmake',
    descriptionId: 'homepage.project.amentXmake',
    descriptionDefault: '用于 xmake 构建的 ROS 2 ament 规则包。',
    link: 'https://github.com/ros-x/ament_xmake',
  },
  {
    title: 'ros2_xmake_examples',
    descriptionId: 'homepage.project.examples',
    descriptionDefault: '示例软件包和端到端集成测试。',
    link: 'https://github.com/ros-x/ros2_xmake_examples',
  },
  {
    title: 'colcon-fish',
    descriptionId: 'homepage.project.colconFish',
    descriptionDefault: 'colcon 的 Fish shell 支持。',
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
              在 GitHub 上查看
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
                项目
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
