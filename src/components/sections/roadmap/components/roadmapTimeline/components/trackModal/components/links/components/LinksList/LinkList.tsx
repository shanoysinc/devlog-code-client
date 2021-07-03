import React from "react";
import { Typography, Collapse } from "antd";
import { useQuery } from "@apollo/client";
import { GET_RESOURCE_LINKS } from "../../../../../../../../../../../graphql/query";
import {
  ResourceLinks as ResourceLinksData,
  ResourceLinksVariables,
} from "../../../../../../../../../../../graphql/query/resourceLink/__generated__/ResourceLinks";

interface Props {
  currentTrackId: string | undefined;
}

const { Title } = Typography;
const { Panel } = Collapse;
export const LinkList = ({ currentTrackId }: Props) => {
  console.log(currentTrackId);

  const { data } = useQuery<ResourceLinksData, ResourceLinksVariables>(
    GET_RESOURCE_LINKS,
    { variables: { trackId: currentTrackId } }
  );

  const links = data?.resourceLinks ? data.resourceLinks : null;

  const LinksElement = links
    ? links.map((link, index) => (
        <div className="link-item" key={link.id}>
          <h3>
            {index + 1}. Title : <span>{link.title}</span>{" "}
          </h3>
          <p className="link-item__url">
            <span>Url : </span>
            <a href={`${link.url}`} target="_bank" rel="noreferrer noopener">
              {link.url}
            </a>
          </p>
          {link.review ? (
            <Collapse ghost style={{ marginTop: "-1.2em" }}>
              <Panel header="Review" key="1">
                <p>{link.review}</p>
              </Panel>
            </Collapse>
          ) : null}
        </div>
      ))
    : null;
  return (
    <div className="link-items__container">
      <Title level={4}>Links</Title>
      {LinksElement}
    </div>
  );
};
