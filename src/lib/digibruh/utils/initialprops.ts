import { NextPageContext, NextPage } from "next";
import Digibruh, { DigibruhStatic } from "../Digibruh";
import { PostOrPage } from "@tryghost/content-api";

export interface DigibruhPageProps {
  initialDigibruh: DigibruhStatic;
  errorCode: number | null;

  subject?: string;
  field?: string;
  post?: PostOrPage;
}

interface Context extends NextPageContext {}

export type DigibruhPage = NextPage<DigibruhPageProps>;

export async function getInitialDigibruh(
  ctx: Context
): Promise<DigibruhPageProps> {
  ctx.res?.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");

  const digibruh = await Digibruh.initialize();

  const { query } = ctx;
  const subject = query?.subject?.toString() || null;
  const field = query?.field?.toString() || null;
  const post = query?.post?.toString() || null;

  let toBeReturned: DigibruhPageProps = {
    initialDigibruh: digibruh,
    errorCode: null,
  };

  const notFound = () => {
    toBeReturned.errorCode = 404;
    return toBeReturned;
  };

  if (subject) {
    if (!digibruh.getSubjectBySlug(subject)) return notFound();

    toBeReturned.subject = subject;

    if (field) {
      if (!digibruh.getFieldBySlug(subject, field)) return notFound();

      toBeReturned.field = field;

      if (post) {
        try {
          const fetchedPost = await digibruh.fetchPostBySlug(post);

          if (!fetchedPost) return notFound();

          toBeReturned.post = fetchedPost;
        } catch (error) {
          return notFound();
        }
      }
    }
  }

  return toBeReturned;
}
