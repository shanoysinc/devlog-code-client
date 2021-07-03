import React from "react";
import { Typography, Input, Form, Button, Select } from "antd";
import { useMutation } from "@apollo/client";
import { CREATE_RESOURCE_LINK } from "../../../../../../../../../../../graphql/mutation";
import {
  CreateResourceLink as CreateResourceLinkData,
  CreateResourceLinkVariables,
} from "../../../../../../../../../../../graphql/mutation/resourceLink/createResourceLink/__generated__/CreateResourceLink";
import { GET_RESOURCE_LINKS } from "../../../../../../../../../../../graphql/query";

interface Props {
  currentTrackId: string | undefined;
}

const { Title } = Typography;
const { Option } = Select;
const urlTypes = ["Video", "Free Course", "Paid Course", "Blog"];

export const ResourceLinkForm = ({ currentTrackId }: Props) => {
  const [form] = Form.useForm();
  const [createLink] = useMutation<
    CreateResourceLinkData,
    CreateResourceLinkVariables
  >(CREATE_RESOURCE_LINK);

  const onFinish = (values: {
    title: string;
    urlType: string;
    review: string | undefined;
    url: string;
  }) => {
    let { review, title, urlType, url } = values;

    let reviewVal = review?.trim() === "" ? undefined : review?.trim();

    if (currentTrackId) {
      createLink({
        variables: {
          input: {
            title: title.trim(),
            url: url.trim(),
            urlType: urlType.trim(),
            review: reviewVal,
            trackId: currentTrackId,
          },
        },
        refetchQueries: [
          { query: GET_RESOURCE_LINKS, variables: { trackId: currentTrackId } },
        ],
      });
    }
  };
  return (
    <div className="create-resourceLink__container">
      <Title level={3}>Add A Link</Title>

      <Form form={form} onFinish={onFinish}>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: "Please entire a title for this link",
            },
          ]}
        >
          <Input
            placeholder="eg. Learning to react "
            name="title"
            className="input track-modal__title"
            size="small"
            required
          />
        </Form.Item>
        <Form.Item
          name="url"
          label="URL"
          rules={[
            {
              required: true,
              message:
                "Please enter a Link so you and other people can use it in the future",
            },
          ]}
        >
          <Input
            name="url"
            className="input"
            size="large"
            required
            placeholder="eg. https://devlog-code.netlify.app"
          />
        </Form.Item>
        <Form.Item name="review" label="review">
          <Input.TextArea
            name="review"
            className="input "
            placeholder="Give a little review of what you have attain from this link"
            size="small"
            rows={10}
            style={{ maxWidth: 495 }}
          />
        </Form.Item>
        <Form.Item
          name="urlType"
          label="Link Type"
          rules={[
            {
              required: true,
              message: "Please select what type of link that you used.",
            },
          ]}
        >
          <Select value={urlTypes[0]} style={{ width: 120 }}>
            {urlTypes.map((type) => (
              <Option key={type} value={type}>
                {type}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
