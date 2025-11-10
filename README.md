# 💝 빼빼로데이 특별 선물 웹페이지

여자친구를 위한 특별한 빼빼로데이 선물 웹페이지입니다.

## ✨ 주요 기능

### 🎨 프리미엄 디자인
- **유리모피즘(Glassmorphism)** 효과로 현대적이고 세련된 디자인
- **그라데이션 배경** 애니메이션
- **커스텀 커서** 효과 (데스크탑)
- 완벽한 **모바일 반응형** 디자인

### 🌟 인터랙티브 효과
- **3D 파티클 시스템** (Three.js)
- **GSAP 스크롤 애니메이션**
- **사진 3D 틸트 효과**
- **편지 봉투 열기 애니메이션**
- **인터랙티브 하트 캔버스**

### 💖 특별한 섹션들
1. **Hero Section** - 화려한 오프닝
2. **카운터** - 함께한 시간 카운트업
3. **사진 갤러리** - 3장의 추억 사진
4. **사랑하는 이유** - 6개의 이유 카드
5. **편지** - 클릭하면 열리는 편지 봉투
6. **하트 캔버스** - 터치/클릭으로 하트 생성
7. **최종 메시지** - 빼빼로 애니메이션

### 🎁 이스터에그
- 떠다니는 하트 애니메이션
- 코나미 코드 (↑↑↓↓←→←→) 입력 시 특별 효과!

## 📸 사진 준비하기

### 사진 파일 추가
`images/` 폴더에 다음 3장의 사진을 넣어주세요:

- **photo1.jpg** - 첫 번째 추억 사진
- **photo2.jpg** - 두 번째 추억 사진
- **photo3.jpg** - 세 번째 추억 사진

### 사진 최적화 팁
모바일에서 빠른 로딩을 위해:
- 최대 너비: 1200px
- 포맷: JPEG
- 품질: 80-85%
- 온라인 도구: [TinyJPG](https://tinyjpg.com/) 또는 [Squoosh](https://squoosh.app/)

## 🚀 GitHub Pages로 배포하기

### 방법 1: GitHub Desktop (초보자 추천!)

1. **GitHub Desktop 설치**
   - [GitHub Desktop 다운로드](https://desktop.github.com/)

2. **새 저장소 만들기**
   - GitHub Desktop 열기
   - File > Add Local Repository
   - 프로젝트 폴더 선택
   - "repository not found" 시 → Create Repository 클릭

3. **파일 커밋**
   - Commit message: "Initial commit: Pepero Day gift"
   - Commit to main

4. **GitHub에 푸시**
   - Publish repository
   - **Public으로 설정** (중요!)
   - Publish 클릭

5. **GitHub Pages 활성화**
   - GitHub.com에서 저장소 열기
   - Settings > Pages
   - Source: Deploy from a branch
   - Branch: main, / (root)
   - Save

6. **완성! 🎉**
   - 2-3분 후 `https://[username].github.io/pepero-day` 접속 가능
   - 이 링크를 여자친구에게 전송!

### 방법 2: 커맨드라인

```bash
cd pepero-day-gift
git init
git add .
git commit -m "Initial commit - Pepero Day Gift 💝"

# GitHub CLI 사용
gh repo create pepero-day --public --source=. --push

# GitHub Pages는 Settings > Pages에서 활성화
```

## 🎨 커스터마이징

### 메시지 수정
`index.html` 파일에서:
- 편지 내용: `.letter-content` 섹션
- 사랑하는 이유: `.reason-text` 섹션
- 최종 메시지: `.final-message` 섹션

### 색상 변경
`css/style.css` 파일의 `:root` 변수:
```css
:root {
    --primary-pink: #FFB6C1;
    --secondary-pink: #FFC0CB;
    --dark-pink: #FF69B4;
}
```

### 카운터 숫자 변경
`index.html`의 `data-target` 속성 수정:
```html
<div class="counter-number" data-target="365">0</div>
```

## 📱 모바일 최적화

- 터치 제스처 지원
- 반응형 레이아웃
- 빠른 로딩 속도
- 부드러운 애니메이션

## 🛠️ 기술 스택

- **HTML5** - 시맨틱 마크업
- **CSS3** - 고급 애니메이션 & 유리모피즘
- **JavaScript (ES6+)** - 인터랙티브 기능
- **GSAP** - 프로페셔널 애니메이션
- **Three.js** - 3D 파티클 효과

## 💡 배포 후 확인사항

- [ ] 링크가 정상적으로 열리는가?
- [ ] 사진 3장이 모두 보이는가?
- [ ] 휴대폰에서 잘 보이는가?
- [ ] 스크롤 애니메이션이 작동하는가?
- [ ] 편지를 클릭하면 열리는가?

## 🎁 여자친구에게 보내는 방법

### 카카오톡 메시지 예시:

**직접적으로**
```
자기야, 빼빼로데이 선물 준비했어 💝
https://[username].github.io/pepero-day
```

**신비롭게**
```
빼빼로는 안 샀는데...
더 특별한 거 준비했어 ㅎㅎ
이 링크 열어봐! 💕
https://[username].github.io/pepero-day
```

**낭만적으로**
```
오늘 11월 11일, 특별한 날이잖아?
내 마음을 담은 선물이야 ❤️
https://[username].github.io/pepero-day
```

## 🔧 문제 해결

### 사진이 안 보여요
- `images/` 폴더에 파일명 확인 (photo1.jpg, photo2.jpg, photo3.jpg)
- 대소문자 정확히 확인
- Git 커밋/푸시 다시 시도

### 404 에러
- GitHub Pages 활성화 확인
- 2-3분 기다린 후 재시도
- 링크 정확히 확인

### 애니메이션이 안 돼요
- 최신 브라우저 사용
- 인터넷 연결 확인 (CDN 필요)
- 시크릿 모드로 테스트

## ❤️ 마지막으로

이 웹페이지에 진심을 담았습니다.
여자친구가 감동받을 거예요! 💝

**Happy Pepero Day! 🎉**

---

**Made with ❤️ for Pepero Day 2024.11.11**
