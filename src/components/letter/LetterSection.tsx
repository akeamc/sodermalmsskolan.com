import Link from "next/link";
import { useRouter } from "next/router";
import React, { FunctionComponent } from "react";
import { useAuth } from "../../lib/auth/AuthContext";
import { redirectUriQueryKey } from "../../lib/auth/hooks/useRedirectUri";
import { loginLink } from "../../lib/auth/href";
import useLetters from "../../lib/news/hooks/useLetters";
import Letter from "../../lib/news/structures/Letter";
import Card from "../OldCard";
import CardGrid from "../grid/CardGrid";
import { CardTitle } from "../text/headings";
import { CardDescription } from "../text/paragraphs";
import LetterCard from "./LetterCard";

/**
 * Section displaying letters.
 *
 * @returns {React.ReactElement} The rendered section.
 */
const LetterSection: FunctionComponent = () => {
  const { data } = useLetters();
  const { user } = useAuth();
  const router = useRouter();

  const letters: Letter[] = data ?? new Array(12).fill(null);

  return (
    <div css={{
      position: "relative",
    }}
    >
      <CardGrid overlay={user ? undefined : (
        <Card>
          <CardTitle>Inloggning krävs</CardTitle>
          <CardDescription>
            Du måste
            {" "}
            <Link href={loginLink({
              [redirectUriQueryKey]: router.asPath,
            })}
            >
              <a>logga in</a>
            </Link>
            {" "}
            för att visa veckobreven.
          </CardDescription>
        </Card>
      )}
      >
        {letters
          .map((letter, index) => <LetterCard letter={letter} key={letter?.id ?? index} />)}
      </CardGrid>
    </div>
  );
};

export default LetterSection;
