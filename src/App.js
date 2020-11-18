import "./App.css";
import Filter from "./components/Filter";
import Item from "./components/Item";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import get from "lodash.get";

const mockupData = [
  {
    id: 1,
    title: "Refactor issues",
    updated_at: "2020/10/10",
    user: "Hoan Corgi",
    tag: "help wanted",
    state: "open",
    body: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`,
  },
  {
    id: 2,
    title: "Fix bug",
    updated_at: "2020/10/10",
    state: "close",
    user: "Alex",
    tag: "bug",
    body: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).`,
  },
  {
    id: 3,
    title: "Fix conflict",
    updated_at: "2020/10/10",
    state: "close",
    tag: "enhancement",
    user: "Michelle",
    body: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`,
  },
];

function App() {
  const [show, setShow] = useState(false);

  const [modalContent, setModalContent] = useState({});
  const [filterState, setFilterState] = useState("open");
  const [itemData, setItemData] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(async () => {
    const issues = await axios.get(
      `https://api.github.com/repos/nnluukhtn/employment_bot/issues?state=all`
    );

    setItemData(
      issues.data.map((v) => ({
        id: v.id,
        title: v.title,
        updated_at: v.updated_at,
        state: v.state,
        tag: get(v, "labels[0].description"),
        user: get(v, "user.login"),
        body: v.body,
        number: v.number,
      }))
    );
  }, []);

  return (
    <>
      <div className="App p-4">
        <Filter
          onClick={setFilterState}
          openCount={itemData.filter((v) => v.state === "open").length}
          closeCount={itemData.filter((v) => v.state === "closed").length}
        />
        <div className="p-3 border border-secondary">
          {itemData
            .filter((v) => {
              if (filterState === "all") {
                return v;
              }

              return v.state === filterState;
            })
            .map((v) => (
              <Item
                key={v.id}
                onClick={() => {
                  handleShow();
                  setModalContent(v);
                }}
                data={v}
              />
            ))}
        </div>
        <Modal />
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{modalContent.body}</div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
