export function getValues() {
  let arr = [];

  for (let i = 0; i < document.getElementsByTagName("div").length; i++) {
    if (
      document.getElementsByTagName("div")[i].id.indexOf("dnn_ContentPane") >= 0
    ) {
      if (document.getElementsByTagName("div")[i].querySelector("a") == "") {
        arr.push(
          `Update HTMLText SET IsPublished = 1 WHERE ModuleID = ${
            document.getElementsByTagName("div")[i].querySelector("a").name
          }`
        );
      }
    }
  }

  const tabId = `DELETE FROM TabSettings WHERE SettingName IN ('DefaultWorkflowKey', 'DefaultVersioningKey') and TabId = ${dnn.getVar(
    "sf_tabId"
  )} UPDATE ci SET StateID = ISNULL(cwsPub.StateID, cws.StateID) FROM ContentItems ci INNER JOIN Tabs t ON t.TabID = ci.TabID INNER JOIN ContentWorkflowStates cws ON ci.StateID = cws.StateID LEFT JOIN ContentWorkflowStates cwsPub ON cws.WorkflowID = cwsPub.WorkflowID AND cwsPub.StateName = 'Published' WHERE t.TabID = ${dnn.getVar(
    "sf_tabId"
  )} AND ci.ContentTypeID = 1 UPDATE tv SET IsPublished = 1 FROM (SELECT *, ROW_NUMBER() OVER(PARTITION BY TabId ORDER BY Version DESC) rn FROM TabVersions) tv WHERE tv.TabID = ${dnn.getVar(
    "sf_tabId"
  )} AND tv.rn = 1`;

  return arr.join(" ") + " " + tabId;
}

console.log(getValues());
copy(getValues());
