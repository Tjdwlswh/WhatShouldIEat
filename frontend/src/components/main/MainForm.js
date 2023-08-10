import styled from 'styled-components';
import Button from '../common/Button';
import palette from '../../lib/styles/palette';

const StyleImgBox = styled.div`
  flex: 0 0 auto;
  width: 41.66667%;
  box-sizing: border-box;
  padding-right: 1rem;
  padding-left: 1rem;
  order: 1;
  cursor: pointer;
  a {
    color: black;
    display: block;
  }
  img {
    width: 100%;
    height: auto;
    vertical-align: middle;
    &:hover {
      transition: transform 0.4s ease;
      transform: translateY(-3rem);
    }
  }
`;

const StyleForm = styled.div`
  text-align: left;
  padding-top: 7.5rem;
  padding-bottom: 7.5rem;
  flex: 0 0 auto;
  width: 58.33333%;
  box-sizing: border-box;
  font-family:
    'Source Sans Pro',
    'Open Sans',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    'Helvetica Neue',
    Arial,
    sans-serif,
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol';
  .logo {
    font-size: 2rem;
    color: #f9fafd;
    font-weight: 900;
    line-height: 1;
    margin-top: 0;
    margin-bottom: 0.8rem;
  }
  .description {
    color: #616161;
    font-size: 1.5736rem;
    margin-top: 0;
    margin-bottom: 0.3rem;
    font-weight: 700;
    line-height: 1.2;
  }
`;

const WhiteBlock = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fffefe;
  background-clip: border-box;
  margin-top: 2rem;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.5rem;
  text-align: center;
  box-sizing: border-box;

  .card_body {
    flex: 1 1 auto;
    padding: 1rem 1rem;
  }
  .nav_tabs {
    border-bottom: 1px solid #eee;
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
  }
  .button {
    font-family:
      'Source Sans Pro',
      'Open Sans',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      'Helvetica Neue',
      Arial,
      sans-serif,
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol';
    cursor: pointer;
    text-transform: none;
    margin-bottom: 0.2rem;
    font-size: 11px;
    line-height: inherit;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    border: 1px solid transparent;
    outline: 0;
    width: 4rem;
    box-sizing: border-box;
    height: auto;
    .nav_link {
      background: none;
      border: 1px solid transparent;
      display: block;
      padding: 0.5rem 1rem;
      color: #757575;
      transition:
        color 0.15s ease-in-out,
        background-color 0.15s ease-in-out,
        border-color 0.15s ease-in-out;
      isolation: isolate;
    }
    .active {
      color: #f17228;
      background-color: rgba(241, 114, 40, 0.15);
      border-color: rgba(0, 0, 0, 0);
      //버튼이 눌리면 active 클래스가 붙여지는 이벤트를 만들어줘야함
    }
  }
`;

const WhiteInputBlock = styled.div`
  margin-top: 1rem;
  box-sizing: border-box;

  .row {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;
  }
  .col {
    width: 100%;
    max-width: 100%;
    padding: 0.5rem;
  }
  .arrange {
    width: 6rem;
    padding: 0.5rem;
  }
`;
const WhiteInput = styled.input`
  padding: 0.5rem 2.2rem;
  vertical-align: middle;
  border: 0 solid #e0e0e0;
  border-radius: 0.25rem;
  width: 100%;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #424242;
  background-color: #f5f5f5;
`;
const InputButton = styled.button`
  width: 5rem;
  color: white;
  background-color: ${palette.accent};
  display: inline-block;
  font-weight: 700;
  line-height: 1.5;
  text-align: center;
  vertical-align: middle;
  border: 1px solid transparent;
  padding: 0.5rem;
  font-size: 0.7rem;
  border-radius: 0.4rem;
  @media (max-width: 576px) {
    .auto {
      flex: 0 0 auto;
      width: auto;
    }
  }
`;

const MainForm = () => {
  return (
    <>
      <StyleImgBox>
        <a href="#!">
          <img src="img/hero-header.png" alt="hero-header" />
        </a>
      </StyleImgBox>
      <StyleForm>
        <h1 className="logo">요리하실려구요?</h1>
        <h1 className="description">오늘은 뭐해먹지 고민하지 마시고</h1>
        <h1 className="description">AI가 만들어준 레시피로 요리하세요!</h1>
        <WhiteBlock>
          <div className="card_body">
            <nav>
              <div className="nav_tabs">
                <button className="button">Recipe</button>
              </div>
            </nav>
            <WhiteInputBlock>
              <form className="row">
                <div className="col">
                  <WhiteInput></WhiteInput>
                </div>
                <div className="arrange">
                  <InputButton className="auto">Find Food</InputButton>
                </div>
              </form>
            </WhiteInputBlock>
          </div>
        </WhiteBlock>
      </StyleForm>
    </>
  );
};

export default MainForm;
