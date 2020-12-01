import Digibruh, { DigibruhStatic } from "./Digibruh";
import { PostOrPage } from "@tryghost/content-api";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";

export interface StaticDigibruhProps {
  initialDigibruh: DigibruhStatic;
  found: boolean;
  subject?: string;
  field?: string;
  post?: PostOrPage;
}

export const getStaticDigibruh: GetStaticProps<StaticDigibruhProps> = async ({
  params,
}) => {
  const digibruh = await Digibruh.initialize();

  const subject = params?.subject?.toString() || null;
  const field = params?.field?.toString() || null;
  const post = params?.post?.toString() || null;

  const toBeReturned: GetStaticPropsResult<StaticDigibruhProps> = {
    props: {
      initialDigibruh: digibruh.serialize(),
      found: true,
    },
    revalidate: 300,
  };

  const notFound = () => {
    toBeReturned.props.found = false;
    return toBeReturned;
  };

  if (subject) {
    if (!digibruh.getSubjectBySlug(subject)) return notFound();

    toBeReturned.props.subject = subject;

    if (field) {
      if (!digibruh.getFieldBySlug(subject, field)) return notFound();

      toBeReturned.props.field = field;

      if (post) {
        try {
          const fetchedPost = await digibruh.fetchPostBySlug(post);

          if (!fetchedPost) return notFound();

          toBeReturned.props.post = fetchedPost;
        } catch (error) {
          return notFound();
        }
      }
    }
  }

  return toBeReturned;
};

export type DigibruhPageProps = StaticDigibruhProps;

export type DigibruhPage = NextPage<StaticDigibruhProps>;
