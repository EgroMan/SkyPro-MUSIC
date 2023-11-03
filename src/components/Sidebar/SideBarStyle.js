import styled from "styled-components";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";

export const sidebarMain = styled.div`
  max-width: 418px;
  padding: 20px 90px 20px 78px;
`;

export const sidebarPersonal = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  padding: 12px 0 15px 0;
`;
export const sidebarPersonalName = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  margin-right: 16px;
`;
export const sidebarIcon = styled.div`
  width: 43px;
  height: 43px;
  background-color: #313131;
  border-radius: 50%;
  cursor: pointer;
`;
export const sidebarBlock = styled.div`
  height: 100%;
  padding: 240px 0 0 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
`;
export const sidebarList = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`;
export const sidebarItem = styled.div`
  width: 250px;
  height: 150px;
  &:not(:last-child) {
    margin-bottom: 30px;
  }
`;
export const sidebarLink = styled(Link)`
  width: 100%;
  height: 100%;
`;

export const sidebarImg = styled.img`
  width: 100%;
  height: auto;
`;
//skeleton style

export const skeletonSideBar = styled(Skeleton)`
  margin-left: 15px;
  width: 300px;
  height: 30px;
  background-color: rgb(50, 48, 48);
`;
export const skeletonSideBarImg = styled(Skeleton)`
  margin-bottom: 10px;
  width: 250px;
  height: 150px;
  background-color: rgb(50, 48, 48);
`;