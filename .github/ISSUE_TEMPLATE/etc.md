---
name: etc
about: 빌드 스크립트, 문서 수정, 협업툴 관련 등 기타 내용에 대한 이슈
title: "[Etc]"
labels: ''
assignees: ''

---

# 기타 수정사항 (e.g package.json 배포용 run 커맨드 추가, e.g API 문서 수정)

## 수정 대상
- **_수정할 대상 스크립트, 문서 또는 기타, 예시는 설명을 위해 여러개의 수정 사항이 있음 실제 작성시에는 가급적 한 이슈당 하나씩 권고_**
- react package.json 수정
- spring build.gradle 수정
- API 방 생성 명세서

## 수정 이유
- **_수정 대상을 무슨 이유로 수정하며 어떤식으로 변경할지에 대해 명시_**
- aws 배포 환경과 로컬 개발 환경의 차이를 고려하여 npm run start-dev, npm run start-prod 로 구분할 필요가 있음
- build.gradle QueryDSL 클래스 생성 디렉토리 수정을 위한 gradlew DSL 수정
- API 방 생성 명세에서 복수/단수 표기가 잘못된 부분 수정
