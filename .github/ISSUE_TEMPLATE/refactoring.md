---
name: Refactoring
about: 기능의 변화 없이 내부구조를 개선 시
title: '[Refactoring]'
labels: 'type: 🛠refactoring'
assignees: ''

---

# 리팩토링 내용 (e.g 이미지 저장 내부 로직 개선)

## 리팩토링 대상

- **_리팩토링 대상이 되는 기능 및 클래스 또는 화면_**
- ImageStorageService
- ImageUploadView.html

## 리팩토링 내용

### 현재 문제점

- **_현재 구현된 내부 구조의 문제점_**
1. 파일 저장 및 이미지 파일인지 확인 하는 작업을 ImageStorageService 에서 모두 수행함으로 하나의 클래스가 여러개의 책임을 가지는 형태

### 개선 내용

- **_현재 문제점과 1:N 으로 매칭되는 개선사항_**
1. (1-1) ImageStorageService 를 두개의 클래스로 분할하여 하나의 클래스는 이미지 인지 확인, 또 하나의 클래스는 파일 저장만을 담당하도록 변경한다.
2. (1-2) 현재 문제점 1번에 대한 개선 내용 2
