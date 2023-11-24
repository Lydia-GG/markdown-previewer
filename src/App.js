import './App.css';
import React, { useState } from 'react';
import { marked } from 'marked';
import useLocalStorage from './hook/LocalStorage';
import data from './data.json';

const App = () => {
  const [code, setCode] = useState('');
  const [compiled, setCompiled] = useLocalStorage('contentP', '');
  const [content, setContent] = useLocalStorage('content', code);
  const [clicked, setClicked] = useState('markdown');

  const handleClick = (e) => {
    setClicked(e.target.value);
  };

  const handleChange = (e) => {
    setCode(e.target.value);
    setContent(e.target.value);
    setCompiled(marked.parse(e.target.value));
  };

  return (
    <>
      <h1>MarkDown Previewer React App</h1>
      <div className="container">
        <div className="btns">
          <button
            value="markdown"
            onClick={handleClick}
            className={clicked == 'markdown' ? 'btn' : ''}
          >
            MarkDown
          </button>
          <button
            value="preview"
            onClick={handleClick}
            className={clicked == 'preview' ? 'btn' : ''}
          >
            Preview
          </button>
          <button
            value="docs"
            onClick={handleClick}
            className={clicked == 'docs' ? 'btn' : ''}
          >
            Docs
          </button>
        </div>
        {clicked == 'markdown' && (
          <div>
            <textarea onChange={handleChange} value={content} />
          </div>
        )}
        {clicked == 'preview' && (
          <div
            className="docs"
            dangerouslySetInnerHTML={{ __html: marked.parse(compiled) }}
          ></div>
        )}
        {clicked == 'docs' && (
          <div className="docs">
            {data.basic_syntax.map((element) => {
              return (
                <>
                  <h2>{element.name}</h2>
                  <p>{element.description}</p>
                  {element.examples.map((example, index) => {
                    return (
                      <>
                        <div className="example">
                          <h3>Example {index + 1}</h3>
                          <h3>-markdown:</h3>
                          <p>{example.markdown}</p>
                          <h3>-html:</h3>
                          <p>{example.html}</p>
                        </div>

                        {element.additional_examples.map(
                          (additional_example) => {
                            return (
                              <div className="example">
                                <h3>{additional_example.name}</h3>
                                <p>{additional_example.description}</p>
                                <h3>-markdown:</h3>
                                <p>{additional_example.markdown}</p>
                                <h3>-html:</h3>
                                <p>{additional_example.html}</p>
                              </div>
                            );
                          }
                        )}
                      </>
                    );
                  })}
                </>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
