# 프로젝트 개요

- 프로젝트명 : 푸드 나침반

</br>

- 프로젝트 소개 : 푸드 나침반은 "내가 찾는 맛집을 더 쉽게"라는 슬로건 아래, 개인의 취향을 기반으로 맛집 탐색 경험을 제공하는 서비스이다. 사용자는 지역별, 음식 카테고리별 맛집 정보를 지도를 활용하여 직관적으로 공유할 수 있다.

</br>

- 진행계기 : 광고 없는 나만의 찐맛집을 다른 사람들에게 알리고 다른 사람들의 맛집도 지역별로 또, 지도상으로 한눈에 볼 수 있는 서비스를 만들어보고자 진행

</br>

- 진행기간 : 24.09.12 ~ 24.09.23

</br>

- 배포 링크 : https://food-compass-beige.vercel.app/

</br>

- 깃허브 링크 : https://github.com/jjjangsh/food-compass

</br>

# 담당 기능

- 장성현 (팀장) : 로그인 및 회원가입, 댓글 CRUD 및 페이지네이션, 날씨 API 활용
- 김경혜 (팀원) : 메인페이지 및 전체 레이아웃, 지도에서 주소 검색 및 마크 표시, 탭으로 게시글 필터링, 무한스크롤(json-server 버전차이에 의해 실패)
- 유재희 (팀원) : 게시글 작성 및 수정페이지(이미지 업로드, 내용 입력, 음식 카테고리 선택 기능)
- 박민정 (팀원) : 마이 페이지(내 작성글 모아보기, 정보 수정), 유튜브 API 활용하여 카테고리별 동영상 불러오기
- 정희록 (팀원) : 게시글 상세 페이지 (게시글 삭제기능), 수정 페이지로 리다이렉션, 캐러셀 슬라이드 구현

</br>

# 기술 스택

[![stackticon](https://firebasestorage.googleapis.com/v0/b/stackticon-81399.appspot.com/o/images%2F1727006118237?alt=media&token=72f85118-ca95-4b44-b092-6541439b2a85)](https://github.com/msdio/stackticon)

</br>

# 주요 기능

<img src="https://github.com/user-attachments/assets/f15daff3-b44c-4d6e-bc76-58025884f94d" width="300" height="300"/>
</br>
⬆️로그인

- moneyful 서버를 활용한 로그인
  </br>
  </br>

<img src="https://github.com/user-attachments/assets/1289da2a-d28a-4c20-a8c9-637c2e560217" width="300" height="350"/>
</br>
⬆️회원가입

- moneyful 서버를 활용한 회원가입
  </br>
  </br>

<img src="https://github.com/user-attachments/assets/ad3b1164-cdc9-43b1-b9d3-3a79acbcf909" width="500" height="100"/>
</br>
⬆️날씨

- 사용자는 메인 페이지에 접속하면 현재 위치의 날씨 정보를 확인할 수 있습니다.
  </br>
  </br>

<img src="https://github.com/user-attachments/assets/00395595-4a12-4be4-ae18-db691d8bd336" width="400" height="300"/>
</br>
⬆️댓글

- 사용자가 게시물에 대한 댓글을 작성할 수 있습니다. 댓글은 작성한 순으로 보여지며 한 페이지에 최대 5개의 댓글이 표시됩니다.

- 페이지네이션 기능을 통해 전체 댓글 목록을 확인할 수 있습니다.

- 댓글 작성자는 자신이 단 댓글을 필요에 따라 수정 및 삭제할 수 있습니다.
  </br>
  </br>

<img src="https://github.com/user-attachments/assets/15951cea-8e7a-4e01-8a21-3ea8048d6592" width="400" height="300"/>
</br>
⬆️프로필 변경

- 마이페이지에서 닉네임을 수정할 수 있습니다. 프로필 사진은 렌덤으로 표시됩니다.
  </br>
  </br>

<img src='https://github.com/user-attachments/assets/be2e3a4e-e436-4584-9b0f-932ff2178c8f' width="600" height="300"/>
</br>
⬆️내가 작성한 게시물 불러오기

- 로그인 한 사용자가 작성한 게시물이 마이페이지에 표시됩니다. 이를 통해 사용자는 자신의 게시물 목록을 확인하고 작성한 콘텐츠를 쉽게 관리할 수 있습니다.

- 게시물을 클릭하면 해당 게시물의 상세 정보를 확인할 수 있는 디테일 페이지로 이동합니다.
  </br>
  </br>

<img src='https://github.com/user-attachments/assets/05dadd2d-8621-47f8-9111-16e9cbb49dc2' width="600" height="300"/>
</br>
⬆️필터별 youtube 동영상 가져오기

- 사용자는 메인 화면에서 음식에 관한 동영상을 볼 수 있습니다.
- 해당 유튜브 영상은 사용자가 니즈에 맞게 지역별, 종류별로 필터링 하여 불러올 수 있고 화면에 표시됩니다.
  </br>
  </br>

<img width="300" alt="게시글 작성" src="https://github.com/user-attachments/assets/aa5a7410-0034-46ba-a600-56a5c966d5d6">
</br>
⬆️포스트 작성

- 로그인한 사용자만이 포스트를 작성할 수 있습니다. 사진, 제목, 내용, 카테고리를 추가할 수 있으며 지도 위치를 클릭해 가게 주소를 불러오고 해당 정보를 등록합니다.
- 포스트를 게시하면 메인 화면으로 이동하고 이를 통해 사용자는 추가된 게시물을 확인할 수 있습니다.
  </br>
  </br>
  <img width="300" alt="image" src="https://github.com/user-attachments/assets/08adfa07-4388-4308-91d9-790eb1b54650">
  </br>
  ⬆️포스트 수정
  </br>

- 사용자는 자신이 작성한 글만 수정할 수 있습니다. 사진, 제목, 내용, 카테고리를 수정할 수 있으며 지도 위치를 클릭해 가게 주소를 불러오고 수정하여 게시글을 관리합니다.
- 수정 버튼 클릭 시 디테일 페이지로 이동하며 수정된 내용이 바로 반영되는 것을 확인할 수 있습니다.
  </br>
  </br>

<img src="https://github.com/user-attachments/assets/acbf1631-2e8e-48c2-94dd-015526f833a4" width="400"/>
</br>
⬆️게시글 상세 페이지
</br>
</br>

- 포스트 상세 정보 불러오기
  - 사용자는 디테일 페이지에서 게시글의 제목, 내용, 가게 주소 등 게시글의 전체적인 정보를 확인할 수 있습니다.
  - 가게의 위치를 지도로 한눈에 파악할 수 있으며 지도 마커 클릭 시에도 세부 정보를 얻을 수 있습니다.
- 게시글 삭제

  - 로그인 한 사용자는 내가 작성한 게시물만 삭제할 수 있습니다.
  - 삭제 버튼을 클릭하면 삭제와 동시에 메인 화면으로 이동합니다.

    </br>

<img src="https://github.com/user-attachments/assets/0980a49a-c160-403d-97b8-1637140afdf4" alt="탭 시연 움짤"/>
</br>
⬆️탭으로 게시물 필터링

- 사용자는 처음 메인 화면에서 전체 게시글을 확인할 수 있습니다. 그 후 지역별, 음식 종류별 카테고리를 필터링해서 원하는 게시글을 쉽게 얻을 수 있습니다.

</br>

# 트러블 슈팅

💣 문제 : 댓글을 불러오지 못하는 문제, 댓글 페이지네이션 기능에서 1페이지에서 2페이지로 넘어가도 1페이지에 해당하는 댓글들만 보이는 문제

</br>

문제 화면⬇️</br>
<img src='https://github.com/user-attachments/assets/cb5614a0-bb01-49f2-bffa-15563a28e4ee' width="400" height="400"/>

</br>
에러 코드⬇️</br>

```
// postId에 해당하는 댓글들 개수 가져오는 useQuery

  const {
    data: totalCommentsCount,
    isLoading: isCountLoading,
    isError: isCountError
  } = useQuery({
    queryKey: ['comments', postId, page],
    queryFn: () => getCommentCount(postId)
  });

  const totalPages = Math.ceil(totalCommentsCount / limit);

ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  // postId에 해당하는 댓글들 페이지처리 해서 가져오는 useQuery

  const {
    data: comments,
    isLoading: isCommentLoading,
    isError: isCommentError
  } = useQuery({
    queryKey: ['comments', postId, page],
    queryFn: () => getComments(postId, page, limit)
  });
```

</br>

- 원인
  - 위 두개의 useQuery에서 같은 queryKey를 사용하고 있어 내 의도와 다르게 동작
- 위 두개의 useQuery의 queryKey가 같으면 안 되는 이유
  - 서로 다른 데이터가 캐시에 저장되면서 데이터 덮어쓰기 문제가 발생
  - 캐시 무효화 시 의도하지 않은 쿼리가 다시 호출되고 성능 저하 유발
  - 잘못된 데이터가 표시되거나, 댓글 목록이나 개수를 제대로 불러오지 못하는 오류 발생
- 해결 방법
  - 두 useQuery는 서로 다른 데이터를 캐시하고 관리하는 용도이기 때문에 queryKey를 분리하는 것이 적절

</br>

수정 코드⬇️</br>

```
// postId에 해당하는 댓글들 개수 가져오는 useQuery
  const {
    data: totalCommentsCount,
    isLoading: isCountLoading,
    isError: isCountError
  } = useQuery({
    queryKey: ['commentCount', postId],
    queryFn: () => getCommentCount(postId)
  });

  ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  // postId에 해당하는 댓글들 페이지처리 해서 가져오는 useQuery
  const {
    data: comments,
    isLoading: isCommentLoading,
    isError: isCommentError
  } = useQuery({
    queryKey: ['comments', postId, page],
    queryFn: () => getComments(postId, page, limit)
  });
```

</br>

수정 후 화면⬇️</br>

<img src='https://github.com/user-attachments/assets/33f74237-8da6-40a3-a98d-aac0749362f3' width="400" height="400"/>
</br>

</br>

# 팀원 소감

- 장성현 : 외부 API를 사용하면서 공식문서나 reference를 분석하는 것이 어려웠지만 좋은 경험이었습니다.

- 김경혜 : 이번에 외부 API와 json-server를 깊게 알고 다루어야 하는 작업을 하면서 이에 대한 이해가 크게 상승한 것을 느꼈고, 내가 원하는 기능을 구현하려면 postData와 같은 연결되는 데이터나 활용 가능한 기능을 잘 이해해야 한다는 것을 알게 되었다.

- 유재희 : 게시글 작성 페이지를 맡으면서 데이터가 어떻게 저장되는지에 대한 구성도 중요하다는 것을 깨달았습니다. 게시글을 저장하고 필요할 때 쉽게 불러올 수 있도록 설계하는 과정이 유익했습니다! 프로젝트를 문제없이 마무리해낸 조원들에게 감사드리고 모두 고생하셨습니다!!

- 박민정 : 데이터를 가져오고 활용하면서 axios, useQuery 등에 대한 이해도가 상승하였고, 외부데이터를 가져와서 사용하는 경험을 통해 보다 풍부하게 웹 사이트를 구현 할 수 있게 되어 아주 유익한 시간이었습니다. 또한 처음 배포를 해봄으로써 진행이 수월하지만은 못했지만 팀원분들과 함께 해결해나가면서 협업의 가치 및 중요성을 배웠습니다 팀원분들께 감사드립니다.

- 정희록 : 요번 프로젝트를 통해 외부 API와 서버에 대한 이해도가 깊어져서 정말 유익했다고 생각합니다. 또한 배포 과정 및 배포 후에도 오류가 많이 날 수 있다는 것을 경험했고 다음 프로젝트에는 QA기간을 더 늘리면 좋겠다는 생각을 했습니다. 마지막으로 끝까지 고생해준 팀원들에게 넘 감사드립니다.

</br>
