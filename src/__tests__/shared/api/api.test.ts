import { 
  startLogin, startRegistration, LogOut, 
  getHabbits, getAllGroups, addGroup, configureGroup, deleteGroup,
  GetSettingsConfig, configureSettings, addHabit, deleteHabit, configureHabit,
  newRecord, getDashboardHabbits, getHabitStats,
  startExport, startImport
} from "@/shared/api/api";
import { axiosApi } from "../../../shared/api/axiosApi";

jest.mock("../../../shared/api/axiosApi");

describe("API functions", () => {
  const mockedAxios = axiosApi as jest.Mocked<typeof axiosApi>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ===== LOGIN & REGISTRATION =====
  it("startLogin должен отправить POST и вернуть данные", async () => {
    const mockData = { token: "123" };
    mockedAxios.post.mockResolvedValue({ data: mockData });

    const result = await startLogin({ username: "admin", password: "admin" });

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "/login",
      expect.any(String),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );
    expect(result).toEqual(mockData);
  });

  it("startRegistration должен POST и вернуть данные", async () => {
    const mockData = { id: 1 };
    mockedAxios.post.mockResolvedValue({ data: mockData });

    const result = await startRegistration({ name: "user", password: "pass" });

    expect(mockedAxios.post).toHaveBeenCalledWith("/api/users/add", { name: "user", password: "pass" });
    expect(result).toEqual(mockData);
  });

  it("LogOut должен POST и вернуть данные", async () => {
    const mockData = { success: true };
    mockedAxios.post.mockResolvedValue({ data: mockData });

    const result = await LogOut();

    expect(mockedAxios.post).toHaveBeenCalledWith("/logout");
    expect(result).toEqual(mockData);
  });

  // ===== HABITS =====
  it("getHabbits должен GET с параметрами дат", async () => {
    const mockData = [{ id: 1 }];
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await getHabbits({ startDate: "2024-01-01", endDate: "2024-01-10" });

    expect(mockedAxios.get).toHaveBeenCalledWith("/api/records", {
      params: { startDate: "2024-01-01", endDate: "2024-01-10" },
    });
    expect(result).toEqual(mockData);
  });

  // ===== GROUPS =====
  it("getAllGroups должен GET все группы", async () => {
    const mockData = [{ id: 1, name: "Test" }];
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await getAllGroups();

    expect(mockedAxios.get).toHaveBeenCalledWith("/api/groups/all");
    expect(result).toEqual(mockData);
  });

  it("addGroup должен POST новую группу", async () => {
    const mockData = { id: 1 };
    mockedAxios.post.mockResolvedValue({ data: mockData });

    const result = await addGroup({ name: "New", color: "red" });

    expect(mockedAxios.post).toHaveBeenCalledWith("/api/groups", { name: "New", color: "red" });
    expect(result).toEqual(mockData);
  });

  it("configureGroup должен POST конфигурацию группы", async () => {
    const mockData = { success: true };
    mockedAxios.post.mockResolvedValue({ data: mockData });

    const result = await configureGroup({ groupId: 1, name: "Updated" });

    expect(mockedAxios.post).toHaveBeenCalledWith("/api/groups/configure", { groupId: 1, name: "Updated" });
    expect(result).toEqual(mockData);
  });

  it("deleteGroup должен DELETE группу", async () => {
    const mockData = { success: true };
    mockedAxios.delete.mockResolvedValue({ data: mockData });

    const result = await deleteGroup(1);

    expect(mockedAxios.delete).toHaveBeenCalledWith("/api/groups/1");
    expect(result).toEqual(mockData);
  });

  // ===== SETTINGS =====
  it("GetSettingsConfig должен GET настройки", async () => {
    const mockData = { darkMode: true };
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await GetSettingsConfig();

    expect(mockedAxios.get).toHaveBeenCalledWith("/api/users/settings");
    expect(result).toEqual(mockData);
  });

  it("configureSettings должен POST изменения настроек", async () => {
    const mockData = { success: true };
    mockedAxios.post.mockResolvedValue({ data: mockData });

    const result = await configureSettings({ showHidden: false });

    expect(mockedAxios.post).toHaveBeenCalledWith("/api/users/settings", { showHidden: false });
    expect(result).toEqual(mockData);
  });

  // ===== HABIT CONFIG =====
  it("addHabit должен POST новую привычку", async () => {
    const mockData = { id: 1 };
    mockedAxios.post.mockResolvedValue({ data: mockData });

    const result = await addHabit({ groupId: 1,
    name: "Run",
    type: "GENERAL",
    hidden: false,
    schedule: "EVERYDAY" ,
    scheduleN: 1});

    expect(mockedAxios.post).toHaveBeenCalledWith("/api/habits", { name: "Run", groupId: 1, type: "GENERAL", hidden: false, schedule: "EVERYDAY", scheduleN: 1 });
    expect(result).toEqual(mockData);
  });

  it("deleteHabit должен DELETE привычку", async () => {
    const mockData = { success: true };
    mockedAxios.delete.mockResolvedValue({ data: mockData });

    const result = await deleteHabit(1);

    expect(mockedAxios.delete).toHaveBeenCalledWith("/api/habits/1");
    expect(result).toEqual(mockData);
  });

  it("configureHabit должен POST конфигурацию привычки", async () => {
    const mockData = { success: true };
    mockedAxios.post.mockResolvedValue({ data: mockData });

    const result = await configureHabit({ habitId: 1, groupId: 1, name: "Updated" });

    expect(mockedAxios.post).toHaveBeenCalledWith("/api/habits/configure", { habitId: 1, groupId: 1, name: "Updated" });
    expect(result).toEqual(mockData);
  });

  // ===== DASHBOARD =====
  it("newRecord должен PUT запись", async () => {
    const mockData = { id: 1 };
    mockedAxios.put.mockResolvedValue({ data: mockData });

    const result = await newRecord({ habitId: 1, date: "2024-01-01", value: true });

    expect(mockedAxios.put).toHaveBeenCalledWith("/api/records", { habitId: 1, date: "2024-01-01", value: true });
    expect(result).toEqual(mockData);
  });

  it("getDashboardHabbits должен GET по дате", async () => {
    const mockData = [{ id: 1 }];
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await getDashboardHabbits("2024-01-01");

    expect(mockedAxios.get).toHaveBeenCalledWith("/api/records/day?date=2024-01-01");
    expect(result).toEqual(mockData);
  });

  it("getHabitStats должен GET статистику привычки", async () => {
    const mockData = { count: 5 };
    mockedAxios.get.mockResolvedValue({ data: mockData });

    const result = await getHabitStats(1);

    expect(mockedAxios.get).toHaveBeenCalledWith("/api/habits/1/stats");
    expect(result).toEqual(mockData);
  });

//   // ===== EXPORT / IMPORT =====
//   it("startExport должен GET экспорт данных", async () => {
//     const mockData = { exported: true };
//     mockedAxios.get.mockResolvedValue({ data: mockData });

//     const result = await startExport();

//     expect(mockedAxios.get).toHaveBeenCalledWith("/api/export");
//     expect(result).toEqual(mockData);
//   });

//   it("startImport должен POST импорт данных", async () => {
//     const mockData = { success: true };
//     const payload = { exported: true };
//     mockedAxios.post.mockResolvedValue({ data: mockData });

//     const result = await startImport(payload);

//     expect(mockedAxios.post).toHaveBeenCalledWith("/api/import", payload);
//     expect(result).toEqual(mockData);
//   });
 });
