import {
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
  ConflictException,
  InternalServerException,
  NotImplementedException,
} from '../libs/httpException';

describe('Test httpException', () => {
  it('BadRequestException', () => {
    const e = new BadRequestException('잘못된 요청 테스트');

    expect(e instanceof BadRequestException).toBeTruthy();
    expect(e.status).toBe(400);
    expect(e.message).toBe('잘못된 요청 테스트');
    expect(e.type).toBe('BadRequest');
  });

  it('UnauthorizedException', () => {
    const e = new UnauthorizedException('접근 불가 테스트');

    expect(e instanceof UnauthorizedException).toBeTruthy();
    expect(e.status).toBe(401);
    expect(e.message).toBe('접근 불가 테스트');
    expect(e.type).toBe('Unauthorized');
  });

  it('ForbiddenException', () => {
    const e = new ForbiddenException('권한 없음 테스트');

    expect(e instanceof ForbiddenException).toBeTruthy();
    expect(e.status).toBe(403);
    expect(e.message).toBe('권한 없음 테스트');
    expect(e.type).toBe('Forbidden');
  });

  it('NotFoundException', () => {
    const e = new NotFoundException('리소스 존재 하지 않음 테스트');

    expect(e instanceof NotFoundException).toBeTruthy();
    expect(e.status).toBe(404);
    expect(e.message).toBe('리소스 존재 하지 않음 테스트');
    expect(e.type).toBe('NotFound');
  });

  it('ConflictException', () => {
    const e = new ConflictException('리소스 중복 발생 테스트');

    expect(e instanceof ConflictException).toBeTruthy();
    expect(e.status).toBe(409);
    expect(e.message).toBe('리소스 중복 발생 테스트');
    expect(e.type).toBe('Conflict');
  });

  it('InternalServerException', () => {
    const e = new InternalServerException('서버 에러 테스트');

    expect(e instanceof InternalServerException).toBeTruthy();
    expect(e.status).toBe(500);
    expect(e.message).toBe('서버 에러 테스트');
    expect(e.type).toBe('InternalServerError');
  });

  it('NotImplementedException', () => {
    const e = new NotImplementedException('서버 구현 덜 됨 테스트');

    expect(e instanceof NotImplementedException).toBeTruthy();
    expect(e.status).toBe(501);
    expect(e.message).toBe('서버 구현 덜 됨 테스트');
    expect(e.type).toBe('NotImplemented');
  });
});
