import "./indes.css";

import { CloseOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Drawer,
  Input,
  Modal,
  Select,
  Switch,
  Tabs,
  Textarea,
  TextBox,
  Tooltip,
} from "@force-dev/react-front";
import * as React from "react";
import { useEffect, useState } from "react";

const overlay = <span>Tooltip Text</span>;
const styles: any = {
  display: "table-cell",
  height: "60px",
  width: "80px",
  textAlign: "center",
  background: "#f6f6f6",
  verticalAlign: "middle",
  border: "5px solid white",
};

const rowStyle = {
  display: "table-row",
};

export const Playground = () => {
  const [openModal, onOpenModal] = useState(false);
  const [openDrawer, onOpenDrawer] = useState(false);
  const [checked, setChecked] = useState(false);
  const [bool, setBool] = useState(false);
  const [text, setText] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    setTimeout(() => {
      setBool(true);
    }, 1000);
  }, []);

  return (
    <div style={{ paddingBottom: 200, width: "100%" }}>
      <TextBox title={"Title string"}>{"Description"}</TextBox>

      <Tabs
        items={[
          { label: "111111", key: "1", children: 1 },
          { label: "222222222", key: "2", children: 2 },
          { label: "3333333333", key: "3", children: 3 },
          { label: "44", key: "4", children: 4 },
          { label: "5555", key: "5", children: 5 },
        ]}
      />

      <TextBox title={"Кнопки"}>
        <Button ctx={{ data: "string" }} onClick={console.log}>
          Button text
        </Button>
        <Button disabled={true}>Button Disable</Button>
      </TextBox>

      <TextBox title={"Checkbox"}>
        <Checkbox
          title={"Чекбокс"}
          onChange={(checked, value, ctx) =>
            console.log(
              "checked = ",
              checked,
              ", VALUE = ",
              value,
              ", ctx = ",
              ctx,
            )
          }
        />
      </TextBox>

      <TextBox title={"Radio"}>
        <Checkbox
          radio={true}
          title={"Чекбокс"}
          onChange={(checked, value, ctx) =>
            console.log(
              "checked = ",
              checked,
              ", VALUE = ",
              value,
              ", ctx = ",
              ctx,
            )
          }
        />
      </TextBox>

      <TextBox title={"Checkbox group"}>
        <Checkbox.Group
          defaultValue={[3]}
          onChange={(value, ctx) =>
            console.log("VALUE = ", value, ", ctx = ", ctx)
          }
          items={[
            {
              title: "Checkbox item 1",
              value: 1,
              ctx: { a: "str" },
            },
            {
              title: "Checkbox item 2",
              value: 2,
            },
          ]}
        />
      </TextBox>

      <TextBox title={"Checkbox button group"}>
        <Checkbox.Group
          defaultValue={[2]}
          onChange={(value, ctx) =>
            console.log("VALUE = ", value, ", ctx = ", ctx)
          }
          items={[
            {
              title: "Checkbox button 1",
              value: 1,
              ctx: { a: "str" },
            },
            {
              title: "Checkbox button 2",
              value: 2,
            },
          ]}
        >
          <Checkbox.Group.Wrap style={{ display: "flex" }} />
          <Checkbox.Button />
        </Checkbox.Group>
      </TextBox>

      <TextBox title={"Radio group"}>
        <Checkbox.RadioGroup
          onChange={(value, ctx) =>
            console.log("VALUE = ", value, ", ctx = ", ctx)
          }
          defaultValue={2}
          // value={3}
          items={[
            {
              title: "Radio item 1",
              value: 1,
              ctx: { a: "str" },
            },
            {
              title: "Radio item 2",
              value: 2,
            },
            {
              title: "Radio item 3",
              value: 3,
            },
            {
              title: "Radio item 4",
              value: 4,
            },
          ]}
        />
      </TextBox>

      <TextBox title={"Input password"}>
        <Input
          placeholder={"Пароль"}
          onFocus={console.log}
          touch={true}
          error={"Ошибка"}
          type={"password"}
        >
          <Input.Placeholder>
            <Input.Placeholder.Active />
          </Input.Placeholder>
          <Input.Wrap />
          <Input.Error />
          <Input.RightIcon></Input.RightIcon>
        </Input>
      </TextBox>

      <TextBox title={"Input text"}>
        <Input
          placeholder={"Текстовое поле"}
          touch={true}
          error={"Ошибка"}
          onChange={event => setText(event.target.value)}
          value={text}
        >
          <Input.Placeholder>
            <Input.Placeholder.Active />
          </Input.Placeholder>
          <Input.Wrap />
          <Input.Error />
          <Input.RightIcon onClick={() => setText("")}>
            <CloseOutlined />
          </Input.RightIcon>
        </Input>
      </TextBox>

      <TextBox title={"Textarea"}>
        <Textarea
          onChange={event => setText(event.target.value)}
          value={text}
          placeholder={"Текстовое поле"}
          touch={true}
          error={"Ошибка"}
        >
          <Textarea.Placeholder>
            <Textarea.Placeholder.Active />
          </Textarea.Placeholder>
          <Textarea.Wrap />
          <Textarea.Error />
        </Textarea>
      </TextBox>

      <TextBox title={"Select"}>
        <Select
          options={[
            { value: 1, label: "1" },
            {
              label: "2",
              options: [
                { value: 22, label: "22" },
                { value: 33, label: "33" },
                { value: 44, label: "44" },
              ],
            },
          ]}
          placeholder={"Селект"}
          onChange={value => console.log("value", value)}
        />
      </TextBox>

      <TextBox title={"DatePicker"}>
        <DatePicker
          selected={date}
          name={"datepicker"}
          onChange={e => {
            console.log("DATE", e);
            setDate(e.target.value);
          }}
        />
      </TextBox>

      <TextBox title={"Switch"}>
        <Switch
          checked={checked}
          onChange={event => {
            setChecked(event);
            console.log("event", event);
          }}
          handleDiameter={28}
          offColor="#08f"
          onColor="#0ff"
          offHandleColor="#0ff"
          onHandleColor="#08f"
          height={40}
          width={70}
          borderRadius={6}
          activeBoxShadow="0px 0px 1px 2px #fffc35"
        >
          <Switch.Active>
            <div>1</div>
          </Switch.Active>
          <Switch.UnActive>
            <div>2</div>
          </Switch.UnActive>
          <Switch.HandleActive>
            <div>3</div>
          </Switch.HandleActive>
          <Switch.HandleUnActive>
            <div>4</div>
          </Switch.HandleUnActive>
        </Switch>
        <Switch
          checked={checked}
          onChange={event => {
            setChecked(event);
            console.log("event", event);
          }}
        ></Switch>
      </TextBox>

      <TextBox title={"Tooltips"}>
        <div style={{ display: "table" }}>
          <div style={rowStyle}>
            <Tooltip placement="left" overlay={overlay}>
              <a href="#" style={styles}>
                Left
              </a>
            </Tooltip>
            <Tooltip placement="top" overlay={overlay}>
              <a href="#" style={styles}>
                Top
              </a>
            </Tooltip>
            <Tooltip placement="bottom" overlay={overlay}>
              <a href="#" style={styles}>
                Bottom
              </a>
            </Tooltip>
            <Tooltip placement="right" overlay={overlay}>
              <a href="#" style={styles}>
                Right
              </a>
            </Tooltip>
          </div>
          <div style={rowStyle}>
            <Tooltip placement="leftTop" overlay={overlay}>
              <a href="#" style={styles}>
                Left Top
              </a>
            </Tooltip>
            <Tooltip placement="leftBottom" overlay={overlay}>
              <a href="#" style={styles}>
                Left Bottom
              </a>
            </Tooltip>
            <Tooltip placement="rightTop" overlay={overlay}>
              <a href="#" style={styles}>
                Right Top
              </a>
            </Tooltip>
            <Tooltip placement="rightBottom" overlay={overlay}>
              <a href="#" style={styles}>
                Right Bottom
              </a>
            </Tooltip>
          </div>
          <div style={rowStyle}>
            <Tooltip placement="topLeft" overlay={overlay}>
              <a href="#" style={styles}>
                Top Left
              </a>
            </Tooltip>
            <Tooltip placement="topRight" overlay={overlay}>
              <a href="#" style={styles}>
                Top Right
              </a>
            </Tooltip>
            <Tooltip placement="bottomLeft" overlay={overlay}>
              <a href="#" style={styles}>
                Bottom Left
              </a>
            </Tooltip>
            <Tooltip placement="bottomRight" overlay={overlay}>
              <a href="#" style={styles}>
                Bottom Right
              </a>
            </Tooltip>
          </div>
        </div>
      </TextBox>

      <TextBox title={"Drawer"}>
        <Button onClick={() => onOpenDrawer(true)}>Open</Button>
        <Drawer
          placement={"right"}
          open={openDrawer}
          onClose={() => onOpenDrawer(false)}
        >
          <TextBox title={"Some drawer title"}>Some drawer content</TextBox>
        </Drawer>
      </TextBox>

      <TextBox title={"Modal"}>
        <Button onClick={() => onOpenModal(true)}>Open</Button>
        <Modal isOpen={openModal} onRequestClose={() => onOpenModal(false)}>
          <TextBox title={"Some modal title"}>Some modal content</TextBox>
        </Modal>
      </TextBox>
    </div>
  );
};
