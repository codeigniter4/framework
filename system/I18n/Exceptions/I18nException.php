<?php namespace CodeIgniter\I18n\Exceptions;

use CodeIgniter\Exceptions\ExceptionInterface;
use CodeIgniter\Exceptions\FrameworkException;

/**
 * Class I18nException
 * @package CodeIgniter\I18n\Exceptions
 */
class I18nException extends FrameworkException implements ExceptionInterface
{

	/**
	 * @param string $month
	 *
	 * @return static
	 */
	public static function forInvalidMonth(string $month)
	{
		return new static(lang('Time.invalidMonth', [$month]));
	}

	/**
	 * @param string $day
	 *
	 * @return static
	 */
	public static function forInvalidDay(string $day)
	{
		return new static(lang('Time.invalidDay', [$day]));
	}

	/**
	 * @param string $lastDay
	 * @param string $day
	 *
	 * @return static
	 */
	public static function forInvalidOverDay(string $lastDay, string $day)
	{
		return new static(lang('Time.invalidOverDay', [$lastDay, $day]));
	}

	/**
	 * @param string $hour
	 *
	 * @return static
	 */
	public static function forInvalidHour(string $hour)
	{
		return new static(lang('Time.invalidHour', [$hour]));
	}

	/**
	 * @param string $minutes
	 *
	 * @return static
	 */
	public static function forInvalidMinutes(string $minutes)
	{
		return new static(lang('Time.invalidMinutes', [$minutes]));
	}

	/**
	 * @param string $seconds
	 *
	 * @return static
	 */
	public static function forInvalidSeconds(string $seconds)
	{
		return new static(lang('Time.invalidSeconds', [$seconds]));
	}
}
