import { useHistory } from "react-router-dom";
import QS from 'query-string';

export interface AdminQueryParams {
  lsID?: string;
  lID?: string;
  lsNew?: true;
}

export default function () {
  const history = useHistory();
  const { search } = history.location;
  return QS.parse(search);
}
