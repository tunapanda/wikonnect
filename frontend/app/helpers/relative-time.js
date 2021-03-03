import { helper } from "@ember/component/helper";
import moment from "moment";

export default helper(function relativeTime(params /*, hash*/) {
  return moment(params).fromNow();
});
