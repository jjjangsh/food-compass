# 프로젝트 개요

- 프로젝트명 : 푸드 나침반

</br>

- 프로젝트 소개 : 푸드 나침반은 "내가 찾는 맛집을 더 쉽게"라는 슬로건 아래, 개인의 취향을 기반으로 맛집 탐색 경험을 제공하는 서비스이다. 사용자는 지역별, 음식 카테고리별 맛집 정보를 지도를 활용하여 직관적으로 공유할 수 있다.

</br>

- 진행계기 : 광고 없는 나만의 찐맛집을 다른 사람들에게 알리고 다른 사람들의 맛집도 지역별로 또, 지도상으로 한눈에 볼 수 있는 서비스를 만들어보고자 진행

</br>

- 진행기간 : 24.09.12 ~ 24.09.23

</br>

- 배포 링크 :

</br>

- 깃허브 링크 :

</br>

# 담당 기능

- 장성현 (팀장) : 로그인 및 회원가입, 댓글 CRUD 및 페이지네이션, 날씨 API 활용
- 김경혜 (팀원) : 메인페이지 및 전체 레이아웃, 지도에서 주소 검색 및 마크 표시, 탭으로 게시글 필터링, 무한스크롤(json-server 버전차이에 의해 실패)
- 유재희 (팀원) : 게시글 작성 및 수정페이지(이미지 업로드, 내용 입력, 음식 카테고리 선택 기능)
- 박민정 (팀원) : 마이 페이지(내 작성글 모아보기, 정보 수정), 유튜브 API 활용하여 카테고리별 동영상 불러오기
- 정희록 (팀원) : 게시글 상세 페이지 (게시글 삭제기능), 수정 페이지로 리다이렉션, 캐러셀 슬라이드 구현

</br>

# 주요 기능

<img src="https://github.com/user-attachments/assets/f15daff3-b44c-4d6e-bc76-58025884f94d" width="300" height="300"/>
</br>
로그인

</br>

<img src="https://github.com/user-attachments/assets/1289da2a-d28a-4c20-a8c9-637c2e560217" width="300" height="350"/>
</br>
회원가입

</br>

<img src="https://github.com/user-attachments/assets/ad3b1164-cdc9-43b1-b9d3-3a79acbcf909" width="4000" height="100"/>
</br>
날씨

</br>

<img src="https://github.com/user-attachments/assets/00395595-4a12-4be4-ae18-db691d8bd336" width="400" height="300"/>
</br>
댓글

</br>


<img src='https://github.com/user-attachments/assets/15951cea-8e7a-4e01-8a21-3ea8048d6592'/>
</br>
프로필 변경

</br>

<img src='https://github.com/user-attachments/assets/be2e3a4e-e436-4584-9b0f-932ff2178c8f'/>
</br>
내가 작성한 게시물 불러오기

</br>

<img src='https://github.com/user-attachments/assets/05dadd2d-8621-47f8-9111-16e9cbb49dc2'/>
</br>
필터별 youtube 동영상 가져오기

</br>


<img width="300" alt="게시글 작성" src="https://github.com/user-attachments/assets/aa5a7410-0034-46ba-a600-56a5c966d5d6">
</br>
포스트 작성
</br>
</br>
<img width="300" alt="image" src="https://github.com/user-attachments/assets/08adfa07-4388-4308-91d9-790eb1b54650">
</br>
포스트 수정
</br>
</br>


</br>
탭으로 게시물 필터링

<img src="https://github.com/user-attachments/assets/0980a49a-c160-403d-97b8-1637140afdf4" alt="탭 시연 움짤"/>

</br>




# 기술 스택

[![stackticon](https://firebasestorage.googleapis.com/v0/b/stackticon-81399.appspot.com/o/images%2F1727006118237?alt=media&token=72f85118-ca95-4b44-b092-6541439b2a85)](https://github.com/msdio/stackticon)

# 트러블 슈팅

- 유튜브 api를 사용해 동영상을 불러오는 것에는 하루 할당량이 정해져있음. 하여 이를 보다 효율적으로 사용하기 위해서 staleTime을 사용하여 불필요한 fetching을 줄임

- useQuery를 사용하여 키워드 필터링이 적용된 동영상을 가져올 때 queryKey 사용 대신 키워드가 변경 될 때 마다 refetch를 실행하게하여 성능을 개선시킴

# 팀원 소감
