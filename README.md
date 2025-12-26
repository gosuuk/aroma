# 🌺 아로마 추천 트리

당신의 기분과 목적에 맞는 완벽한 아로마를 찾아보세요!

## 🚀 기술 스택

- **Vite** - 빠른 개발 환경
- **React 19** - 최신 React
- **TypeScript** - 타입 안정성
- **Vercel** - 간편한 배포

## 📦 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프리뷰
npm run preview
```

## 🌐 Vercel 배포

### 1. Vercel CLI 사용

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### 2. GitHub 연동 (추천)

1. GitHub에 레포지토리 생성 및 푸시
2. [Vercel](https://vercel.com) 접속 후 GitHub 계정 연동
3. Import Project로 레포지토리 선택
4. 자동으로 감지된 설정으로 배포

## ✨ 기능

- **인터랙티브 트리 네비게이션** - 단계별로 선택하며 나에게 맞는 아로마 찾기
- **4가지 카테고리**
  - 🌸 휴식 & 릴랙스
  - ⚡ 활력 & 집중
  - 💝 기분전환 & 행복
  - 🌿 정화 & 청정
- **12가지 아로마** - 각 카테고리별 3가지 추천
- **반응형 디자인** - 모바일/데스크톱 모두 지원
- **아름다운 UI** - 그라데이션과 애니메이션 효과

## 📝 커스터마이징

`src/App.tsx`의 `aromaTree` 객체를 수정하여 새로운 아로마나 카테고리를 추가할 수 있습니다.

```typescript
const aromaTree: AromaNode = {
  id: 'root',
  name: '아로마 추천',
  description: '당신에게 맞는 아로마를 찾아보세요',
  children: [
    // 여기에 새로운 카테고리 추가
  ]
}
```

## 📄 라이선스

MIT
