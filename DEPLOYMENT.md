# 🚀 Vercel 배포 가이드

## 배포 방법

### 방법 1: GitHub 연동 (권장)

1. **GitHub 레포지토리 생성**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Aroma Recommendation Tree"
   git branch -M main
   git remote add origin https://github.com/[YOUR_USERNAME]/aroma.git
   git push -u origin main
   ```

2. **Vercel에서 배포**
   - [vercel.com](https://vercel.com)에 접속
   - "Import Project" 클릭
   - GitHub 레포지토리 선택
   - 프레임워크: **Vite** (자동 감지됨)
   - 빌드 설정 (자동으로 설정됨):
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - "Deploy" 클릭

3. **자동 배포 활성화**
   - main 브랜치에 푸시하면 자동으로 재배포됩니다.

### 방법 2: Vercel CLI

1. **Vercel CLI 설치**
   ```bash
   npm i -g vercel
   ```

2. **로그인**
   ```bash
   vercel login
   ```

3. **배포**
   ```bash
   vercel
   ```

4. **프로덕션 배포**
   ```bash
   vercel --prod
   ```

## 환경 변수 설정 (필요시)

현재는 환경 변수가 필요없지만, 나중에 API를 추가하는 경우:

1. Vercel 대시보드에서 프로젝트 선택
2. Settings → Environment Variables
3. 변수 추가
4. 재배포

## 커스텀 도메인 설정

1. Vercel 대시보드 → 프로젝트 선택
2. Settings → Domains
3. 도메인 입력 및 DNS 설정
4. 자동 SSL 인증서 적용

## 빌드 설정

`vercel.json` 파일에 이미 설정되어 있습니다:
- SPA 라우팅 지원
- 모든 경로를 index.html로 리다이렉트

## 문제 해결

### 빌드 실패
- Node.js 버전이 최신인지 확인 (20.19+ or 22.12+)
- Vercel은 자동으로 최신 버전 사용

### 라우팅 404 에러
- `vercel.json` 파일이 존재하는지 확인
- SPA rewrites 설정이 올바른지 확인

### 배포 후 변경사항이 반영되지 않음
- 브라우저 캐시 삭제
- Vercel 대시보드에서 Redeploy

## 성능 최적화

Vercel은 기본적으로 다음을 제공합니다:
- ✅ 자동 CDN 배포
- ✅ 이미지 최적화
- ✅ Gzip/Brotli 압축
- ✅ HTTP/2 및 HTTP/3 지원
- ✅ 자동 SSL 인증서
- ✅ 엣지 캐싱

## 모니터링

Vercel 대시보드에서:
- 배포 로그 확인
- Analytics (프로 플랜)
- 실시간 로그
- 성능 메트릭

## 추가 정보

- [Vercel 문서](https://vercel.com/docs)
- [Vite 배포 가이드](https://vitejs.dev/guide/static-deploy.html)

