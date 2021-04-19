import styled from 'styled-components';
import GlobalStyle, { MEDIA_QUERY_MD } from './constants/style.js';
import { InputItem, OptionItem } from './components/InputItem.js';
import useForm from './components/useForm.js';

const Container = styled.div`
  max-width: 100vmin;
  margin: 5vmin auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 5px 5px 10px 5px rgba(83, 83, 85, 0.5);
  padding: 0 10vmin 10vmin 10vmin;
  border-top: 2vmin #fad312 solid;
  font-size: 1.2rem;

  ${MEDIA_QUERY_MD} {
    margin: 0;
    border-radius: 0;
    padding: 0 4vmin 4vmin 4vmin;
  }
`;

const Header = styled.header`
  & h1 {
    font-size: 2rem;
    font-weight: bold;
    margin: 6vmin 0 4vmin 0;
  }
  & p {
    line-height: 1.5rem;
  }
  & .highlight {
    color: #e74149;
  }
`;

const Form = styled.form`
  padding: 0 4vmin 4vmin 4vmin;
`;

const SubmitButton = styled.input`
  cursor: pointer;
  background-color: #fad312;
  border: none;
  padding: 0.5rem 2rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  box-shadow: 3px 3px 7px 3px #a5a08b;
  transition: transform 0.1s;
  font-size: 1.2rem;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: 0;
  }
`;

const Reminder = styled.div`
  margin-bottom: 3rem;
  color: #696969;
`;

export default function AppForm() {
  const {
    hasError,
    nickname,
    email,
    phone_number,
    attending_types,
    other_info,
    suggestion,
    handleInputChange,
    handleSubmit,
  } = useForm();

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <h1>新拖延運動報名表單</h1>
          <p>
            活動日期：2020/12/10 ~ 2020/12/11
            <br />
            活動地點：台北市大安區新生南路二段1號
          </p>
          <p className='highlight'>* 必填</p>
        </Header>
        <Form onSubmit={handleSubmit}>
          <InputItem
            type={'text'}
            name={'nickname'}
            value={nickname}
            question={'暱稱'}
            placeholder={'您的暱稱'}
            handleInputChange={handleInputChange}
            required={true}
            hasError={hasError}
            errorMessage={'請輸入您的暱稱'}
          />

          <InputItem
            type={'email'}
            name={'email'}
            value={email}
            question={'電子郵件'}
            placeholder={'您的 email'}
            handleInputChange={handleInputChange}
            required={true}
            hasError={hasError}
            errorMessage={'請輸入您的 email'}
          />

          <InputItem
            type={'text'}
            name={'phone_number'}
            value={phone_number}
            question={'手機號碼'}
            placeholder={'您的手機號碼'}
            handleInputChange={handleInputChange}
            required={true}
            hasError={hasError}
            errorMessage={'請輸入您的手機號碼'}
          />

          <OptionItem
            name={'attending_types'}
            value={attending_types}
            question={'報名類型'}
            handleInputChange={handleInputChange}
            required={true}
            hasError={hasError}
            errorMessage={'請選擇報名類型'}
          />

          <InputItem
            type={'text'}
            name={'other_info'}
            value={other_info}
            question={'怎麼知道這個活動的？'}
            placeholder={'您的回答'}
            handleInputChange={handleInputChange}
            required={true}
            hasError={hasError}
            errorMessage={'請輸入您的回答'}
          />

          <InputItem
            type={'text'}
            name={'suggestion'}
            value={suggestion}
            question={'對活動的一些建議'}
            placeholder={'您的回答'}
            handleInputChange={handleInputChange}
            required={false}
            hasError={hasError}
            errorMessage={'請輸入正確資訊'}
          />

          <SubmitButton type='submit' value='提交' />
          <Reminder>請勿透過表單送出您的密碼。</Reminder>
        </Form>
      </Container>
    </>
  );
}
