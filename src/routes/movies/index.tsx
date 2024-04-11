import { Col, Flex, Input, InputNumber, Row, Select, Table } from "antd";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { debounce, fromEntries } from "remeda";
import { Omdb, Search } from "../../types/Omdb.ts";
import { useCallback, useEffect, useMemo } from "react";
import { paginationConfig, tableColumnConfig } from "./config.tsx";

export default function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const movies = useLoaderData() as Omdb | undefined;

  const handleChange = useCallback(
    (name: string, value: string | undefined) => {
      setSearchParams((prev) => {
        const searchParams = new URLSearchParams(prev);
        searchParams.set(name, value || "");
        return searchParams.toString();
      });
    },
    [setSearchParams],
  );

  const debouncer = debounce(handleChange, { waitMs: 500 });

  const pagination = useMemo(
    () => paginationConfig(movies, searchParams),
    [movies, searchParams],
  );
  const columns = useMemo(() => tableColumnConfig, []);

  const restFilter = useMemo(
    () =>
      Object.fromEntries(
        Array.from(searchParams.entries()).filter(([key]) =>
          ["s", "y", "type"].includes(key),
        ),
      ),
    [searchParams],
  );

  const searchParamObj = useMemo(
    () => fromEntries([...searchParams.entries()]),
    [searchParams],
  );

  useEffect(() => {
    if (!searchParamObj.s && !searchParamObj.y && !searchParamObj.type)
      handleChange("page", "1");
  }, [searchParamObj.s, searchParamObj.y, searchParamObj.type]);

  return (
    <Flex vertical gap="large">
      <h1>OMDB Publishings</h1>
      <Row justify="space-between" align="middle" gutter={[16, 16]}>
        <Col span={8}>
          <Input.Search
            size="large"
            placeholder="Search for a publishing"
            defaultValue={searchParams.get("s") || ""}
            loading={!movies}
            onChange={(e) => {
              debouncer.call("s", e.currentTarget.value);
            }}
            autoFocus
          />
        </Col>
        <Col span={8}>
          <InputNumber
            size="large"
            placeholder="Search a release year"
            defaultValue={searchParams.get("y") || ""}
            onChange={(e) => {
              debouncer.call("y", e);
            }}
            className="w-full"
          />
        </Col>
        <Col span={8}>
          <Select
            className="w-full"
            size="large"
            placeholder="Select a type"
            allowClear
            defaultValue={searchParams.get("type") || ""}
            onChange={(e) => {
              debouncer.call("type", e);
            }}
            options={[
              { label: "Movie", value: "movie" },
              { label: "Series", value: "series" },
              { label: "Episode", value: "episode" },
            ]}
          />
        </Col>
      </Row>
      <Table<Search>
        rowKey="imdbID"
        dataSource={movies?.Search}
        columns={columns}
        bordered
        loading={!movies}
        pagination={pagination}
        onChange={(pagination) =>
          handleChange("page", pagination.current?.toString())
        }
      />
    </Flex>
  );
}
