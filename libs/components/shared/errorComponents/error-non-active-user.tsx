export function ErrorNotActiveUser() {
  return (
    <div className="bg-white py-5 rounded-lg px-2">
      <p className="flex items-center text-secondary-foreground text-sm">
        <span className="text-xl">😓</span> Функционал не пока не доступен.
        Менеджер должен подтвердить ваши данные.{' '}
      </p>
    </div>
  )
}
