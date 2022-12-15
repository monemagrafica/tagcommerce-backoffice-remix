import { type FC } from "react";

import { useParams } from "@remix-run/react";
import ModaleAttributi from "~/components/prodotti/modaleAttributi";

type Props = {};

const NewAttributes: FC<Props> = () => {
  const params = useParams();

  return <ModaleAttributi />;
};

export default NewAttributes;
