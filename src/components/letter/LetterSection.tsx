import Link from "next/link";
import { useRouter } from "next/router";
import React, { FunctionComponent } from "react";
import { useAuth } from "../../lib/auth/AuthContext";
import { redirectUriQueryKey } from "../../lib/auth/hooks/useRedirectUri";
import { loginLink } from "../../lib/auth/href";
import ClientLetter, { useLetters } from "../../lib/news/structures/client/letter";
import Card from "../Card";
import CardGrid from "../grid/CardGrid";
import { CardTitle } from "../text/headings";
import { CardDescription } from "../text/paragraphs";
import LetterCard from "./LetterCard";

const LetterSection: FunctionComponent = () => {
  const { data } = useLetters();
  const { user } = useAuth();
  const router = useRouter();

  const letters: ClientLetter[] = data ?? new Array(12).fill(null);

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
