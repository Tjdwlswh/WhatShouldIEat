import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Responsive from '../components/common/Responsive';
import palette from '../lib/styles/palette';
import Button from '../components/common/Button';
import authAPI from '../lib/api/auth';
import { clearUser } from '../modules/user';

const Container = styled(Responsive)`
  @media (min-width: 576px) {
    margin-right: auto;
    margin-left: auto;
  }
  margin-top: 3rem;
  border: solid 1px ${palette.accent};
  border-radius: 5px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Warning = styled.div`
  line-height: 2rem;
`;

const LeavePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.user);

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleLeaveClick = async e => {
    e.preventDefault();
    try {
      const { data } = await authAPI.leave(token);
      alert(data.message);
      dispatch(clearUser());
      navigate('/');
    } catch (error) {
      alert('회원 탈퇴에 실패했습니다. \n계속 실패할 경우 관리자에게 문의해주세요.');
      navigate('/');
      console.error('Error occurred during the API call:', error);
    }
  };

  return (
    <Container>
      <Warning>
        <h3>회원탈퇴를 신청하기 전에 아래 사항을 꼭 확인해주세요.</h3>
        <ul>
          <li>탈퇴 신청시 즉시 탈퇴 처리됩니다.</li>
          <li>탈퇴 후 3개월 동안 회원가입이 불가능합니다.</li>
          <li>작성하신 레시피나 후기는 탈퇴 후에도 유지됩니다.</li>
          <li style={{ color: 'red' }}>
            레시피 삭제 등을 원하는 경우 반드시 삭제 후 탈퇴를 신청해주세요.
          </li>
        </ul>
        <p>아래 확인 버튼을 누르면 탈퇴가 바로 진행됩니다.</p>
      </Warning>
      <Button type="button" onClick={handleLeaveClick}>
        확인
      </Button>
    </Container>
  );
};

export default LeavePage;
